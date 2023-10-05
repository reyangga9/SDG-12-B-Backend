import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb = () => {
  const mongoUrl = `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("Connected to db");
    })
    .catch((e) => console.log("Failed to connect db" + e));
};
