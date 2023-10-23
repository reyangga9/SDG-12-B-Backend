import express from "express";
import {
  createFood,
  getCheapestFood,
  getFood,
} from "../controllers/food.controller.js";

// import { getFood } from "../controllers/food.controller.js";

const router = express.Router();

router.get("/", getFood);
router.get("/cheapestFood", getCheapestFood);

router.post("/createFood", createFood);

// kalo dah ada schema pake yg bwh
// router.get("/", getFood);

export default router;
