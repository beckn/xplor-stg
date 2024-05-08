// This file contains the validation schema for environment variables.
// It uses Joi to define the structure and constraints of the environment variables.
// This ensures that the application has the correct configuration values.
import * as Joi from 'joi';
export default () => ({
  NODE_ENV: Joi.string()
    .required()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().port().required().default(6000),
  DATABASE_URL: Joi.string()
    .required()
    .default('mongodb://localhost:27017/Xplore_User'),
});
