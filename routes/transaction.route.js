// routes/index.js
import express from "express";
import {
  createTransaction,
  getTransactionsByUserId,
  updateTransactionByUserId,
} from "../controllers/transaction.controller.js";
import { validateAuth } from "../middlewares/auth.middleware.js";
const router = express.Router();

// Add your existing routes
router.post("/add", validateAuth, createTransaction);
router.get("/transactions/", validateAuth, getTransactionsByUserId);
router.put("/update/:transactionId", validateAuth, updateTransactionByUserId);
// Add transaction routes

export default router;
