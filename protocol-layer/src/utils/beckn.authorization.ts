import * as _sodium from 'libsodium-wrappers';
export async function getSignatureHeader(
  privateKey,
  publicKey,
  subscriberId,
  uniqueKeyId,
  requestBody,
) {
  const digest = await generateBlakeDigest(JSON.stringify(requestBody));
  const digestBase64 = _sodium.to_base64(
    digest,
    _sodium.base64_variants.ORIGINAL,
  );

  const created = Math.floor(Date.now() / 1000);
  const expires = created + 36000;

  const signingString = `(created): ${created}\n(expires): ${expires}\ndigest: BLAKE-512=${digestBase64}`;
  privateKey = Buffer.from(privateKey, 'base64');
  publicKey = Buffer.from(publicKey, 'base64');
  const signatureBase64 = await signStringWithEd25519(
    signingString,
    privateKey,
  );
  const authorizationHeader = `Signature keyId="${subscriberId}|${uniqueKeyId}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signatureBase64}"`;
  console.log('Authorization Header: ------\n', authorizationHeader);
  return authorizationHeader;
}
async function generateBlakeDigest(input) {
  await _sodium.ready;
  const sodium = _sodium;
  const digest = sodium.crypto_generichash(64, sodium.from_string(input));
  return digest;
}

async function signStringWithEd25519(signingString, privateKeyUint8Array) {
  // Sign the digest
  await _sodium.ready;
  const sodium = _sodium;
  const signature = sodium.crypto_sign_detached(
    signingString,
    privateKeyUint8Array,
  );

  // Convert signature to base64
  const signatureBase64 = sodium.to_base64(
    signature,
    sodium.base64_variants.ORIGINAL,
  );
  return signatureBase64;
}
