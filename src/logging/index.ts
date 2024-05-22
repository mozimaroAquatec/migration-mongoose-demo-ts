import createDevLogger from "./logger.dev";
import createProdLogger from "./logger.prod";

// Determine the environment and create the appropriate logger factory
const logger =
  process.env.NODE_ENV === "production" ? createProdLogger : createDevLogger;

// Create specific loggers for different services

export const usersLoggers = logger("users");
export const serverLogger = logger("server");
export const DBLogger = logger("DB");

export default logger;
