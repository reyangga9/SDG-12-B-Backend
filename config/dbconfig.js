import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb = () => {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => {
      console.log("Connected to db");
    })
    .catch((e) => console.log("Failed to connect db" + e));
};
