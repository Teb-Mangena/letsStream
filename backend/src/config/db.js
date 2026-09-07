import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  const { MONGO_URI } = ENV;

  try {
    await mongoose.connect(MONGO_URI);

    console.log("DB Connected successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
