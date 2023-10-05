// const express = require('express')
import express from "express";
import { connectDb } from "./config/dbconfig.js";
const cors = require("cors");
import foodRoute from "./routes/foods.route.js";
import userRoute from "./routes/user.route.js";

const app = express();
const port = 8800;

app.use(cors());

app.use(express.json());

// handling error
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.use("/api/food", foodRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
  connectDb();
  console.log(`server berjalana di port ${port}`);
});
