import mongoose, { ConnectOptions } from "mongoose";
import ErrorResponse from "../utils/error.handler";
import "./env.config";
import { DBLogger } from "../logging";
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    DBLogger.info("data base connected successfully");
  } catch (error) {
    DBLogger.error(error, `mongoose connect error is : ${error}`);
    throw new ErrorResponse(500, `mongoose connect error is : ${error}`);
  }
};

export default connectDB;
