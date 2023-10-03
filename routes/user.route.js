import express from "express";

import { createUser } from "../controllers/user.controller.js";

const router = express.Router();

// Create user
router.post("/", createUser);

export default router;
