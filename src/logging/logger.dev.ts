import pino from "pino";
import pretty from "pino-pretty";
import chalk from "chalk";
/**
 * Creates a development logger with pretty printing and colored output.
 *
 * @param serviceName - The name of the service for which the logger is created.
 * @returns A configured Pino logger instance.
 */
const createDevLogger = (serviceName: string): pino.Logger => {
  const stream = pretty({
    colorize: true,
    translateTime: "SYS:standard",
  });

  const logger = pino(
    {
      name: serviceName,
      level: "info",
      serializers: {
        err: pino.stdSerializers.err,
      },
    },
    stream
  );

  return logger;
};

export default createDevLogger;
