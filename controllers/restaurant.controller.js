import Restaurant from "../models/Restaurant.models.js";

export const createRestaurant = async (req, res) => {
  try {
    const { nama, alamat, rating, gambarRestaurant, kota } = req.body;
    const newRestaurant = new Restaurant({
      nama,
      alamat,
      rating,
      gambarRestaurant,
      kota,
    });
    const savedRestaurant = await newRestaurant.save();
    res.status(201).json({ is_success: true, data: savedRestaurant });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ is_success: false, message: "Internal server error" });
  }
};

export const getRestaurantAll = async (req, res) => {
  try {
    let restaurant = await Restaurant.find();

    const ratings = restaurant.map((x) => x.rating);
    console.log(ratings);

    // const averageRating = ratings.length
    //   ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
    //   : 0;
    // console.log(averageRating);
    // restaurant = { ...restaurant, averageRating };

    res.status(201).json({
      is_success: true,
      data: restaurant,
    });
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
          avgRating: { $avg: "$rating.rating" },
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
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const restaurants = await Restaurant.find({ category });
    console.log(restaurants);
    res.status(201).json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
