// This file is responsible for parsing and providing access to environment variables.
// It reads the values from the process environment and provides them in a structured format.
// This abstraction simplifies the access to configuration values throughout the application.
export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PROTOCOL_APP_PORT, 10),
  GRAFANA_SERVICE_URL: process.env.GRAFANA_SERVICE_URL,
  APP_SERVICE_URL: process.env.APP_SERVICE_URL,
});
