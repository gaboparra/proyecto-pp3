import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { name, color } = req.body;
    if (!name || !color)
      return res.status(400).json({ message: "Name and color are required" });

    const existing = await Category.findOne({ name });
    if (existing)
      return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name, color });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Error creating category", error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    if (req.body.name === "" || req.body.color === "")
      return res.status(400).json({ message: "Name and color cannot be empty" });

    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Category not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating category", error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting category", error: err.message });
  }
};
