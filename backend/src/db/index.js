import mongoose from "mongoose";
import { config } from "../config/index.js";

export const connectDB = async function () {
  try {
    await mongoose.connect(`${config.mongodb_uri}/${config.db_name}`);
    console.log("Database Connected Successfully :)");
  } catch (error) {
    console.error("Database connection Error => ", error);
    process.exit(1);
  }
};
