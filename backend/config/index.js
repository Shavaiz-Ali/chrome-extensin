import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.MONGO_URI;

// console.log(MONGODB_URI);

export const connectDB = () => {
  try {
    mongoose
      .connect(`${MONGODB_URI}`)
      .then(() => {
        console.log("MongoDB Connected");
      })
      .catch((error) => {
        console.log("mongo db connection failed: " + error);
      });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
