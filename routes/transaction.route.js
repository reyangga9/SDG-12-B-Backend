// routes/index.js
import express from "express";
import { createTransaction } from "../controllers/transaction.controller.js";
import { validateAuth } from "../middlewares/auth.middleware.js";
const router = express.Router();

// Add your existing routes
router.get("/add", validateAuth, createTransaction);
// Add transaction routes

export default router;
