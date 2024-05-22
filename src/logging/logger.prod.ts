import pino from "pino";
import path from "path";
// Import pino-mongodb but we don't need to use it directly
import "pino-mongodb";

const createProdLogger = (serviceName: string): pino.Logger => {
  const logTransport = pino.transport({
    targets: [
      {
        target: "pino/file",
        options: {
          destination: path.join(__dirname, `./logs/${serviceName}.log`),
          mkdir: true,
        },
        level: "info",
      },
      {
        target: "pino-mongodb",
        options: {
          uri: process.env.MONGO_URI_LOGGER, // Use the logger-specific URI
          database: "pino-prod-logger", // Use a different database for logging
          collection: serviceName,
          level: "info",
        },
        level: "info",
      },
    ],
  });

  return pino(
    {
      level: "info",
      base: {
        service: serviceName,
        environment: process.env.NODE_ENV,
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    },
    logTransport
  );
};

export default createProdLogger;
