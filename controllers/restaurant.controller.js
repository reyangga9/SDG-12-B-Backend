import Food from "../models/Food.models.js";
import Restaurant from "../models/Restaurant.models.js";
import { calculateAverageRating } from "../utils/averageRating.js";

export const createRestaurant = async (req, res) => {
  try {
    const {
      nama,
      alamat,
      rating,
      gambarRestaurant,
      kota,
      category,
      jumlahTerjual,
    } = req.body;
    const newRestaurant = new Restaurant({
      nama,
      alamat,
      rating,
      gambarRestaurant,
      kota,
      category,
      jumlahTerjual,
    });
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json({ is_success: true, data: savedRestaurant });
  } catch (error) {
    res
      .status(500)
      .json({ is_success: false, message: "Internal server error" });
  }
};

export const getRestaurantAll = async (req, res) => {
  try {
    const restaurant = await Restaurant.aggregate([
      {
        $project: {
          category: 1,
          _id: 1,
          nama: 1,
          alamat: 1,
          kota: 1,
          gambarRestaurant: 1,
          rating: 1,
          jumlahTerjual: 1,
          createdAt: 1,
          updatedAt: 1,
          __v: 1,
          avgRating: { $round: [{ $avg: "$rating.rating" }, 1] },
        },
      },
    ]);

    res.status(201).json({
      is_success: true,
      data: restaurant,
    });
  } catch (error) {
    res
      .status(500)
      .json({ is_success: false, message: "Internal server error" });
  }
};

export const highestSells = async (req, res) => {
  try {
    const restaurant = await Restaurant.find().sort({ jumlahTerjual: -1 });

    res.status(201).json({
      is_success: true,
      data: restaurant,
    });
  } catch (error) {
    res
      .status(500)
      .json({ is_success: false, message: "Internal server error" });
  }
};

export const mostLoved = async (req, res) => {
  try {
    const highestRatedRestaurant = await Restaurant.aggregate([
      {
        $project: {
          nama: 1,
          rating: 1,
          alamat: 1,
          gambarRestaurant: 1,
          avgRating: { $round: [{ $avg: "$rating.rating" }, 1] },
          category: 1,
        },
      },
      { $sort: { avgRating: -1 } },
    ]);

    if (highestRatedRestaurant.length >= 0) {
      res.status(201).json(highestRatedRestaurant);
    } else {
      res.status(404).json({ message: "No restaurants found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const restaurants = await Restaurant.find({ category });

    res.status(201).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error + "/ Interval Server Error" });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const paramsRestaurant = req.params.id;
    let restaurants = await Restaurant.findById({ _id: paramsRestaurant });

    const avgRating = calculateAverageRating(restaurants);
    restaurants = { ...restaurants._doc, avgRating };

    res.status(201).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error + "/ Interval Server Error" });
  }
};

export const getRestaurantByIdAndFood = async (req, res) => {
  try {
    const paramsRestaurant = req.params.id;
    let restaurants = await Restaurant.findById({ _id: paramsRestaurant });

    const getAllFoodByRestaurant = await Food.find({
      restoId: paramsRestaurant,
    });

    const avgRating = calculateAverageRating(restaurants);
    restaurants = { ...restaurants._doc, avgRating };

    // res.status(201).json({ is_success: true, data: getAllFoodByRestaurant });
    res.status(201).json({
      is_success: true,
      restaurant: restaurants,
      food: getAllFoodByRestaurant,
    });
  } catch (error) {
    res.status(500).json({ message: error + "/ Interval Server Error" });
  }
};
