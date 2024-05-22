declare module "pino-mongodb" {
  import { DestinationStream } from "pino";

  interface PinoMongoDBOptions {
    uri: string;
    database: string;
    collection: string;
    mongoOptions?: object;
    connectionOptions?: object;
    level?: string;
    format?: (log: object) => object;
  }

  function pinoMongoDB(options: PinoMongoDBOptions): DestinationStream;

  export = pinoMongoDB;
}
