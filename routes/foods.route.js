import express from "express";

// import { getFood } from "../controllers/food.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Test");
  //
});

// kalo dah ada schema pake yg bwh
// router.get("/", getFood);

export default router;
