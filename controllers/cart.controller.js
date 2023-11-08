import Cart from "../models/Cart.models.js";
import Restaurant from "../models/Restaurant.models.js";

import { message_error } from "./constant.js";

// Add a product to the cart
export const addProductToCart = async (req, res) => {
  try {
    // Assuming you have middleware that decodes the user information from the token

    const userId = req.user._id; // Adjust this according to your middleware

    const { foodId, quantity } = req.body;

    // Check if a cart item with the same foodId and userId already exists
    const existingCartItem = await Cart.findOne({ userId, foodId });

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + parseInt(quantity, 10);
      if (newQuantity <= 0) {
        // If the new quantity is 0, delete the cart item
        await Cart.deleteOne({ userId, foodId });
        res
          .status(200)
          .json({ is_success: true, message: "Item removed from cart" });
      } else {
        existingCartItem.quantity = newQuantity;
        await existingCartItem.save();
        res.status(200).json({ is_success: true, data: existingCartItem });
      }
    } else {
      // If it doesn't exist, create a new cart item
      const newItem = new Cart({
        userId: userId,
        foodId,
        quantity,
      });

      const savedItem = await newItem.save();

      res.status(201).json({ is_success: true, data: savedItem });
    }
  } catch (error) {
    res.status(500).json({ is_success: false, message: error + message_error });
  }
};

// Update a product in the cart
export const updateProductInCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Get the user ID from the authenticated user's token
    const userId = req.user._id; // Adjust this according to your authentication setup

    // Find the cart item by its ID
    const existingCartItem = await Cart.findById(id);

    if (!existingCartItem) {
      return res
        .status(404)
        .json({ is_success: false, message: "Item not found" });
    }

    if (existingCartItem.userId.toString() !== userId) {
      return res.status(403).json({
        is_success: false,
        message: "You are not authorized to update this item",
      });
    }

    existingCartItem.quantity = quantity;
    await existingCartItem.save();

    res.status(200).json({ is_success: true, data: existingCartItem });
  } catch (error) {
    res.status(500).json({ is_success: false, message: error + message_error });
  }
};

// remove all Cart
export const removeProductFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userIdFromToken = req.user._id; // Adjust this according to your authentication setup

    const deletedItem = await Cart.findById(id);

    if (!deletedItem) {
      return res
        .status(404)
        .json({ is_success: false, message: "Item not found" });
    }

    // Check if the user making the request is the owner of the cart item
    if (deletedItem.userId.toString() !== userIdFromToken) {
      return res.status(403).json({
        is_success: false,
        message: "You are not authorized to delete this item",
      });
    }

    await deletedItem.deleteOne({ id });

    res.status(200).json({ is_success: true, data: deletedItem });
  } catch (error) {
    res.status(500).json({ is_success: false, message: error + message_error });
  }
};

// Get items in the cart for a user
export const getItemsInCartForUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const itemsInCart = await Cart.find({ userId }).populate({
      path: "foodId",
      select: "makanan _id harga restoId",
      model: "Food", // Assuming the model name is 'Food'
    });

    if (itemsInCart.length === 0) {
      return res
        .status(500)
        .json({ is_success: false, message: "User doesnt have any cart" });
    }
    const food = itemsInCart.map((item) => ({
      foodId: item.foodId._id, // Change this to match your desired structure
      makanan: item.foodId.makanan, // Change this to match your desired structure
      harga: item.foodId.harga, // Change this to match your desired structure
      restoId: item.foodId.restoId, // Change this to match your desired structure
      quantity: item.quantity,
    }));

    const resto = await Restaurant.find({
      _id: itemsInCart[0].foodId.restoId,
    }).select("nama alamat kota");
    console.log(resto);

    res.status(200).json({
      is_success: true,
      userId,
      resto: resto,
      food,
    });
  } catch (error) {
    res.status(500).json({ is_success: false, message: error + message_error });
  }
};

export const removeAllItemsFromCart = async (req, res) => {
  try {
    const userId = req.user._id; // Adjust this according to your authentication setup

    const itemsInCart = await Cart.find({ userId });

    if (itemsInCart.length === 0) {
      return res
        .status(404)
        .json({ is_success: false, message: "Cart is already empty" });
    }

    // Check if the user making the request is the owner of all items in the cart
    for (const item of itemsInCart) {
      if (item.userId.toString() !== userId) {
        return res.status(403).json({
          is_success: false,
          message: "You are not authorized to remove items from the cart",
        });
      }
    }

    // Remove all items in the cart for the user
    await Cart.deleteMany({ userId: userId });

    res
      .status(200)
      .json({ is_success: true, message: "All items removed from the cart" });
  } catch (error) {
    res.status(500).json({ is_success: false, message: error + message_error });
  }
};
