import mongoose from "mongoose";

/*
THIS SCHEMA IS USE TO MAP A DYNAMIC UI FRONTEND
{
    title: "Recommendation",
    image: "image.png",
    url: "/recommendation",
    type: "recommendation"
}

{
    title: "Near me",
    image: "image.png",
    url: "/nearme",
    type: "nearme"
}

{
    title: "Best Sellers",
    image: "image.png",
    url: "/bestsellers",
    type: "bestsellers"
}

*/

const MenuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Menu", MenuSchema);
