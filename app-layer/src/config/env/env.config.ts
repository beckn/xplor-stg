// This file is responsible for parsing and providing access to environment variables.
// It reads the values from the process environment and provides them in a structured format.
// This abstraction simplifies the access to configuration values throughout the application.
export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.APP_LAYER_PORT, 10),
  GRAFANA_SERVICE_URL: process.env.GRAFANA_SERVICE_URL,
  PROTOCOL_SERVICE_URL: process.env.PROTOCOL_SERVICE_URL,
  MONGODB_URL: process.env.MONGODB_URL,
});
