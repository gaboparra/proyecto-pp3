import Category from "../models/Category.js";
import logger from "../config/logger.js";

export const createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;

    if (!name || !color) {
      return res.status(400).json({
        status: "error",
        message: "Name and color are required",
      });
    }

    const category = await Category.create({
      name,
      color,
      user: req.user._id,
    });

    res.status(201).json({
      status: "success",
      message: "Category created successfully",
      payload: category,
    });
  } catch (err) {
    logger.error(`Error creating category: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Error creating category",
      error: err.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      $or: [{ user: null }, { user: req.user._id }],
    });

    res.json({
      status: "success",
      message: "Categories fetched successfully",
      payload: categories,
    });
  } catch (err) {
    logger.error(`Error fetching categories: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Error fetching categories",
      error: err.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    if (req.body.name === "" || req.body.color === "") {
      return res.status(400).json({
        status: "error",
        message: "Name and color cannot be empty",
      });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    if (
      !category.user ||
      category.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        status: "error",
        message: "Cannot modify this category",
      });
    }

    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json({
      status: "success",
      message: "Category updated successfully",
      payload: updated,
    });
  } catch (err) {
    logger.error(`Error updating category: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Error updating category",
      error: err.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    if (
      !category.user ||
      category.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        status: "error",
        message: "Cannot delete this category",
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (err) {
    logger.error(`Error deleting category: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Error deleting category",
      error: err.message,
    });
  }
};
