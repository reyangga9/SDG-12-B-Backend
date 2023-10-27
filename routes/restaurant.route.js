import express from "express";
import {
  createRestaurant,
  getRestaurantAll,
  getRestaurantById,
  getRestaurantByIdAndFood,
  highestSells,
  mostLoved,
  searchCategory,
} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.get("/", getRestaurantAll);
router.get("/:id", getRestaurantById);
router.get("/restoandfood/:id", getRestaurantByIdAndFood);

router.post("/createRestaurant", createRestaurant);
router.get("/mostSells", highestSells);
router.get("/mostLoved", mostLoved);
router.get("/search/:category", searchCategory);

export default router;
