import express from "express";

import {
  createMenu,
  getMenuList,
  updateMenu,
  deleteMenu,
} from "../controllers/menu.controller.js";

const router = express.Router();

// Get Menu List
router.get("", getMenuList);
// Create menu
router.post("", createMenu);
// Update menu
router.put("/:menuId", updateMenu);
// Delete menu
router.delete("/:menuId", deleteMenu);

export default router;
