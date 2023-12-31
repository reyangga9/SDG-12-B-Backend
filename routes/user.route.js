import express from "express";

import {
  createUser,
  loginUser,
  logoutUser,
  refreshToken,
} from "../controllers/user.controller.js";
import { validateAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Create user
router.post("/signup", createUser);
// Login user
router.post("/login", loginUser);
// Logout user
router.post("/logout", logoutUser);
// Refresh token
router.get("/refreshToken", refreshToken);

export default router;
