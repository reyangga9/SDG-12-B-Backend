import express from "express";
import {
  addProductToCart,
  updateProductInCart,
  removeProductFromCart,
  getItemsInCartForUser,
  removeAllItemsFromCart,
} from "../controllers/cart.controller.js";
import { validateAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Add a product to the cart
router.post("/add", validateAuth, addProductToCart);

// Update a product in the cart
router.put("/update/:id", validateAuth, updateProductInCart);

// remove All Cart
router.delete("/remove/allCart", validateAuth, removeAllItemsFromCart);
// Remove a product from the cart
router.delete("/remove/:id", validateAuth, removeProductFromCart);

// Get items in the cart for a user
router.get("/user/allCart", validateAuth, getItemsInCartForUser);

export default router;
