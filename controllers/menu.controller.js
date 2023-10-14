import Menu from "../models/Menu.models.js";

export const getMenuList = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json({ isSuccess: true, menus: menus });
  } catch (err) {
    res.status(400).json({ isSuccess: false, message: "Failed to get menus" });
  }
};

export const createMenu = async (req, res) => {
  const { title, image, url, type } = req.body;
  const newMenu = new Menu({
    title,
    image,
    url,
    type,
  });

  try {
    await newMenu.save();
    res
      .status(201)
      .json({ isSuccess: true, message: "New menu is successfully created" });
  } catch (err) {
    res.status(400).json({ isSuccess: false, message: err.message });
  }
};

export const updateMenu = async (req, res) => {
  const menuId = req.params.menuId;
  const { title, image, url, type } = req.body;

  try {
    const menu = await Menu.findByIdAndUpdate(
      menuId,
      {
        title,
        image,
        url,
        type,
      },
      { runValidators: true }
    );
    res
      .status(200)
      .json({ isSuccess: true, message: "Menu is successfully updated" });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};

export const deleteMenu = async (req, res) => {
  const menuId = req.params.menuId;

  try {
    await Menu.findByIdAndDelete(menuId);
    res
      .status(200)
      .json({ isSuccess: true, message: "Menu is successfully deleted" });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};
