import express from "express";
import {
  createRestaurant,
  getRestaurantAll,
  mostLovedRestaurant,
} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.get("/", getRestaurantAll);
router.post("/createRestaurant", createRestaurant);
router.get("/loved", mostLovedRestaurant);

export default router;
