import mongoose from 'mongoose';
import { ENV } from "./env.js";
export const connectDB = async() => {
  try {
  const conn= await mongoose.connect(ENV.DB_URL);
    console.log("✅ Connection Established",conn.connection.host)
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

