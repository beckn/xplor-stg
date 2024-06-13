import { createAuthorizationHeader } from 'ondc-crypto-sdk-nodejs';

export async function createOndcNetworkHeader(
  body,
  privateKey: string,
  subscriberId: string,
  subscriberUniqueKeyId: string,
) {
  return await createAuthorizationHeader({
    body: body,
    privateKey: privateKey,
    subscriberId: subscriberId,
    subscriberUniqueKeyId: subscriberUniqueKeyId,
  });
}
