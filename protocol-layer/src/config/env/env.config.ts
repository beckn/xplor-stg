// This file is responsible for parsing and providing access to environment variables.
// It reads the values from the process environment and provides them in a structured format.
// This abstraction simplifies the access to configuration values throughout the application.
export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PROTOCOL_APP_PORT, 10),
  GRAFANA_SERVICE_URL: process.env.GRAFANA_SERVICE_URL,
  APP_SERVICE_URL: process.env.APP_SERVICE_URL,
  ONDC_PRIVATE_KEY: process.env.ONDC_PRIVATE_KEY,
  ONDC_SUBSCRIBER_ID: process.env.ONDC_SUBSCRIBER_ID,
  ONDC_SUBSCRIBER_UNIQUE_KEY_ID: process.env.ONDC_SUBSCRIBER_UNIQUE_KEY_ID,
  IS_NETWORK_MOCK: process.env.IS_NETWORK_MOCK,
  BELEM_PRIVATE_KEY: process.env.BELEM_PRIVATE_KEY,
  BELEM_PUBLIC_KEY: process.env.BELEM_PUBLIC_KEY,
  BELEM_SUBSCRIBER_ID: process.env.BELEM_SUBSCRIBER_ID,
  BELEM_UNIQUE_KEY: process.env.BELEM_UNIQUE_KEY,
});
