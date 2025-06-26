import mongoose from "mongoose";
import { mongoUri } from "./env.config.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(mongoUri);
    console.log(
      `MongoDB Connected: DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`Error while connecting to Mongo: ${error.message}`);
    process.exit(1);
  }
};

export { connectDB };
