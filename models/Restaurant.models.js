import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
      unique: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    kota: {
      type: String,
      required: true,
    },
    gambarRestaurant: {
      type: String,
      required: true,
    },
    rating: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        rating: {
          type: Number,
          min: 0,
          max: 5,
          required: true,
        },
      },
    ],
    jumlahTerjual: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Restaurant", RestaurantSchema);
