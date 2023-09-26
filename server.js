// const express = require('express')
import express from "express";
import { connectDb } from "./config/dbconfig.js";

const app = express();
const port = 8800;

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

app.listen(port, () => {
  connectDb();
  console.log(`server berjalana di port ${port}`);
});
