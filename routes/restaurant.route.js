import express from "express";
import {
  createRestaurant,
  getRestaurantAll,
  highestSells,
  mostLoved,
} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.get("/", getRestaurantAll);
router.post("/createRestaurant", createRestaurant);
router.get("/mostSells", highestSells);
router.get("/mostLoved", mostLoved);

export default router;
