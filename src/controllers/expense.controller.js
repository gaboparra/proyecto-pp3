import Expense from "../models/Expense.js";
import Category from "../models/Category.js";
import logger from "../config/logger.js";

export const createExpense = async (req, res) => {
  try {
    const { amount, category, date } = req.body;
    const userId = req.user._id;

    if (!amount || !category) {
      return res.status(400).json({
        status: "error",
        message: "Amount and category are required",
      });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        status: "error",
        message: "Category not found",
      });
    }

    const expense = await Expense.create({
      amount,
      category,
      date: date || Date.now(),
      user: userId,
    });

    res.status(201).json({
      status: "success",
      message: "Expense created successfully",
      payload: expense,
    });
  } catch (err) {
    logger.error(`Error creating expense: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Error creating expense",
      error: err.message,
    });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const userId = req.user._id;

    const expenses = await Expense.find({ user: userId })
      .populate("category", "name color")
      .sort({ date: -1 });

    res.json({
      status: "success",
      message: "Expenses fetched successfully",
      payload: expenses,
    });
  } catch (err) {
    logger.error(`Error fetching expenses: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Error fetching expenses",
      error: err.message,
    });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        status: "error",
        message: "Expense not found",
      });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: "error",
        message: "You can only modify your own expenses",
      });
    }

    if (req.body.category) {
      const categoryExists = await Category.findById(req.body.category);
      if (!categoryExists) {
        return res.status(404).json({
          status: "error",
          message: "Category not found",
        });
      }
    }

    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("category", "name color");

    res.json({
      status: "success",
      message: "Expense updated successfully",
      payload: updated,
    });
  } catch (err) {
    logger.error(`Error updating expense: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Error updating expense",
      error: err.message,
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        status: "error",
        message: "Expense not found",
      });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: "error",
        message: "You can only delete your own expenses",
      });
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.json({
      status: "success",
      message: "Expense deleted successfully",
    });
  } catch (err) {
    logger.error(`Error deleting expense: ${err.message}`);
    res.status(500).json({
      status: "error",
      message: "Error deleting expense",
      error: err.message,
    });
  }
};
