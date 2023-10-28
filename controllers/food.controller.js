import Food from "../models/Food.models.js";

export const createFood = async (req, res) => {
  try {
    const {
      makanan,
      tanggalExpired,
      gambarMakanan,
      harga,
      restoId,
      stokMakanan,
      discountPercentage,
      category,
    } = req.body;

    const newFood = new Food({
      makanan,
      tanggalExpired,
      gambarMakanan,
      harga,
      restoId,
      stokMakanan,
      discountPercentage,
      category,
    });

    const savedFood = await newFood.save();

    res.status(201).json({ is_success: true, data: savedFood });
  } catch (error) {
    res
      .status(500)
      .json({ is_success: false, message: "Internal server error" });
  }
};

export const getFood = async (req, res) => {
  try {
    const food = await Food.find();

    if (!food) {
      return res
        .status(404)
        .json({ is_success: false, message: "Food not found" });
    }

    res.status(200).json({ is_success: true, data: food });
  } catch (error) {
    res
      .status(500)
      .json({ is_success: false, message: "Internal server error" });
  }
};

export const getCheapestFood = async (req, res) => {
  try {
    const cheapestFoods = await Food.find().sort({ harga: 1 }).limit(10);

    if (!cheapestFoods || cheapestFoods.length === 0) {
      return res
        .status(404)
        .json({ is_success: false, message: "No food items found" });
    }

    res.status(200).json({ is_success: true, data: cheapestFoods });
  } catch (error) {
    res
      .status(500)
      .json({ is_success: false, message: "Internal server error" });
  }
};

export const getAllFoodByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    const getAllFoodByRestaurant = await Food.find({ restoId: restaurantId });

    res.status(201).json({ is_success: true, data: getAllFoodByRestaurant });
  } catch (error) {
    res
      .status(500)
      .json({ is_success: false, message: "Internal server error" });
  }
};
