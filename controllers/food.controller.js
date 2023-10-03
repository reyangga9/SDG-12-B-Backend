import FoodModels from "../models/Food.models";

export const getFood = async (req, res) => {
  try {
    let food = await FoodModels.findById(req.params.id);

    res.json(food);
  } catch (error) {
    res.json(error);
  }
};

// best seller
export const trendFood = async (req, res) => {
  try {
    const food = await foodModels.find().sort({
      //jumlah pembelian food terbanyak
    });
    res.status(200).json(food);
  } catch (error) {
    res.status(404).json(error);
  }
};
