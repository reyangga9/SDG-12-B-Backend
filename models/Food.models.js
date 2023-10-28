import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    makanan: {
      type: String,
      required: true,
    },
    tanggalExpired: {
      type: Date,
      required: true,
    },
    gambarMakanan: {
      type: String,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
    restoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    stokMakanan: {
      type: Number,
      required: true,
    },
    category: {
      type: [String],
    },

    discountPercentage: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Food", FoodSchema);
