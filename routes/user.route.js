import express from "express";

import { createUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

// Create user
router.post("/signup", createUser);
// Login user
router.post("/login", loginUser);

export default router;
