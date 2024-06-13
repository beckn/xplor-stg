// This file contains the validation schema for environment variables.
// It uses Joi to define the structure and constraints of the environment variables.
// This ensures that the application has the correct configuration values.
import * as Joi from 'joi';
export default () => ({
  NODE_ENV: Joi.string()
    .required()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PROTOCOL_APP_PORT: Joi.string().required().default(6000),
  GRAFANA_SERVICE_URL: Joi.string().required(),
  PROTOCOL_DATABASE_URL: Joi.string()
    .required()
    .default('mongodb://localhost:27017/Xplore_User'),
  ONDC_PRIVATE_KEY: Joi.string().required(),
  ONDC_SUBSCRIBER_ID: Joi.string().required(),
  ONDC_SUBSCRIBER_UNIQUE_KEY_ID: Joi.string().required(),
  IS_NETWORK_MOCK: Joi.boolean().required().default(false),
});
