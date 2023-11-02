import express from "express";
import {
  createFood,
  getAllFoodByRestaurant,
  getCheapestFood,
  getFood,
} from "../controllers/food.controller.js";

const router = express.Router();

router.get("/", getFood);
router.get("/cheapestFood", getCheapestFood);
router.get("/restaurantFood/:restaurantId", getAllFoodByRestaurant);
router.post("/createFood", createFood);

export default router;
