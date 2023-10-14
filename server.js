import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/dbconfig.js";
import cors from "cors";
import foodRoute from "./routes/foods.route.js";
import userRoute from "./routes/user.route.js";
import menuRoute from "./routes/menu.route.js";

const app = express();
const port = process.env.PORT || 8800;

app.use(cors());

app.use(cookieParser());
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
app.use("/api/menus", menuRoute);

app.listen(port, () => {
  connectDb();
  console.log(`server berjalana di port ${port}`);
});
