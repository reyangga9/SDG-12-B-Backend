// Transaction.controller.js
import Transaction from "../models/Transaction.models.js";
import Food from "../models/Food.models.js";

export const createTransaction = async (req, res) => {
  try {
    // const userId = req.user._id;
    const userId = req.user._id; // Adjust this according to your middleware
    console.log("useridOKEOEOEKOOE", userId);
    const { cartItems } = req.body;

    // Calculate total amount and create items array
    const items = [];

    for (const cartItem of cartItems) {
      const food = await Food.findById(cartItem.foodId);

      if (!food) {
        return res.status(404).json({ error: "Food item not found" });
      }

      if (cartItem.quantity > food.stokMakanan) {
        return res
          .status(400)
          .json({ error: "Insufficient stock for one or more items" });
      }

      items.push({
        foodId: food._id,
        quantity: cartItem.quantity,
        subtotal: cartItem.quantity * food.harga,
      });

      // Update stock quantity
      //   food.stokMakanan -= cartItem.quantity;
      await food.save();
    }

    const totalAmount = items.reduce((total, item) => total + item.subtotal, 0);

    // Create the transaction
    const transaction = await Transaction.create({
      userId,
      items,
      totalAmount,
    });

    // Clear the items from the user's cart or mark them as ordered
    // This logic depends on how you've implemented the Cart model

    res.status(201).json({ transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
