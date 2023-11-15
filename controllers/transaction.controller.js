// Transaction.controller.js
import Transaction from "../models/Transaction.models.js";
import Food from "../models/Food.models.js";
import { calculateDiscountedPrice } from "../utils/discountPrice.js";
import Restaurant from "../models/Restaurant.models.js";

export const createTransaction = async (req, res) => {
  try {
    // const userId = req.user._id;
    const userId = req.user._id; // Adjust this according to your middleware

    let restoId;
    const { cartItems } = req.body;

    // Calculate total amount and create items array
    const items = [];

    for (const cartItem of cartItems) {
      const food = await Food.findById(cartItem.foodId);

      if (!food) {
        return res.status(404).json({ error: "Food item not found" });
      }
      restoId = food.restoId;

      const hargaDiscount = calculateDiscountedPrice(
        food.harga,
        food.discountPercentage
      );

      if (cartItem.quantity > food.stokMakanan) {
        return res
          .status(400)
          .json({ error: "Insufficient stock for one or more items" });
      }

      // console.log(hargaDiscount);
      items.push({
        foodId: food._id,
        makanan: food.makanan,
        quantity: cartItem.quantity,
        hargaDiscount: hargaDiscount,
        subtotal: cartItem.quantity * hargaDiscount,
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
      restoId,
    });

    // Clear the items from the user's cart or mark them as ordered
    // This logic depends on how you've implemented the Cart model

    res.status(201).json({ transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTransactionsByUserId = async (req, res) => {
  const userId = req.user._id;

  try {
    const transactions = await Transaction.find({ userId }).exec();

    res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: error });
  }
};

export const updateTransactionByUserId = async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  const transactionId = req.params.transactionId;
  const { rating, comment } = req.body; // Assuming the rating and comment are sent in the request body

  if (!userId) {
    return res
      .status(401)
      .json({ error: "Unauthorized: User not authenticated" });
  }

  try {
    // Find and update the specific transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      { _id: transactionId, userId },
      { $set: { isCompleted: true } },
      { new: true } // This option returns the modified document
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    const restaurantId = updatedTransaction.restoId;

    // Update the restaurant's rating
    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { _id: restaurantId },
      {
        $push: {
          rating: {
            userId,
            rating,
            comment,
          },
        },
      },
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res
      .status(200)
      .json({ transaction: updatedTransaction, restaurant: updatedRestaurant });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ error: error });
  }
};
