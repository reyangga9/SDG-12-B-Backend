// Transaction.model.js
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        makanan: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],
    restoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restairant",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
