import express from "express";
import {
  addProductToCart,
  updateProductInCart,
  removeProductFromCart,
  getItemsInCartForUser,
} from "../controllers/cart.controller.js";
import { validateAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Add a product to the cart
router.post("/add", validateAuth, addProductToCart);

// Update a product in the cart
router.put("/update/:id", validateAuth, updateProductInCart);

// Remove a product from the cart
router.delete("/remove/:id", validateAuth, removeProductFromCart);

// Get items in the cart for a user
router.get("/user/:userId", getItemsInCartForUser);

export default router;
