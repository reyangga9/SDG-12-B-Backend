import express from "express";
import {
  createRestaurant,
  getRestaurantAll,
  getRestaurantById,
  getRestaurantByIdAndFood,
  getRestaurantRandom,
  highestSells,
  mostLoved,
  getRestaurantsByParams,
} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.get("/", getRestaurantAll);
router.get("/mostSells", highestSells);
router.get("/mostLoved", mostLoved);
router.get("/random", getRestaurantRandom);
router.get("/restoandfood/:id", getRestaurantByIdAndFood);
router.post("/createRestaurant", createRestaurant);
router.get("/search/:id", getRestaurantsByParams);
router.get("/:id", getRestaurantById);

export default router;
