import Ajv from 'ajv';

const ajv = new Ajv();

function validateJson(schema: any, data: any) {
  try {
    const validate = ajv.compile(schema);
    const isValid = validate(data);

    if (!isValid) {
      console.warn('[ERROR] Validation failed!', validate.errors);
      return validate.errors;
    }
    return true;
  } catch (error) {
    console.warn('[ERROR] Validation failed!', error);
    return false;
  }
}

export default validateJson;
