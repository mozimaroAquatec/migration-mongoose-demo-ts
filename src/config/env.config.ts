import dotenv from "dotenv";
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envFile });

export default process.env;

export function PORT(arg0: string, PORT: any) {
  throw new Error("Function not implemented.");
}
