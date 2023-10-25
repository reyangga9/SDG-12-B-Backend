import express from "express";
import {
  createRestaurant,
  getRestaurantAll,
  highestSells,
} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.get("/", getRestaurantAll);
router.post("/createRestaurant", createRestaurant);
router.get("/mostSells", highestSells);

export default router;
