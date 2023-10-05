import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb = () => {
  const mongoUrl = `${process.env.DATABASE}`;
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("Connected to db");
    })
    .catch((e) => console.log("Failed to connect db" + e));
};
