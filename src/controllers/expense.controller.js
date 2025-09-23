import Expense from "../models/Expense.js";
import Category from "../models/Category.js";
import User from "../models/User.js";
// import mongoose from "mongoose";

export const createExpense = async (req, res) => {
  try {
    const { amount, category, date, userId } = req.body;
    if (!amount || !category || !userId)
      return res.status(400).json({ message: "Amount, category and userId are required" });

    const userExists = await User.findById(userId);
    if (!userExists) return res.status(404).json({ message: "User not found" });

    const categoryExists = await Category.findById(category);
    if (!categoryExists)
      return res.status(404).json({ message: "Category not found" });

    const expense = await Expense.create({
      amount,
      category,
      date: date || Date.now(),
      user: userId,
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Error creating expense", error: err.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const expenses = await Expense.find({ user: userId })
      .populate("category", "name color")
      .sort({ date: -1 });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses", error: err.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    const userExists = await User.findById(expense.user);
    if (!userExists) return res.status(404).json({ message: "User not found" });

    if (req.body.category) {
      const categoryExists = await Category.findById(req.body.category);
      if (!categoryExists)
        return res.status(404).json({ message: "Category not found" });
    }

    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("category", "name color");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating expense", error: err.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    const userExists = await User.findById(expense.user);
    if (!userExists) return res.status(404).json({ message: "User not found" });

    await Expense.findByIdAndDelete(req.params.id);

    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting expense", error: err.message });
  }
};

// export const getSummary = async (req, res) => {
//   try {
//     const { userId } = req.query;
//     if (!userId) return res.status(400).json({ message: "userId is required" });

//     const userExists = await User.findById(userId);
//     if (!userExists) return res.status(404).json({ message: "User not found" });

//     const summary = await Expense.aggregate([
//       { $match: { user: new mongoose.Types.ObjectId(userId) } },
//       { $group: { _id: "$category", total: { $sum: "$amount" } } },
//       {
//         $lookup: {
//           from: "categories",
//           localField: "_id",
//           foreignField: "_id",
//           as: "category",
//         },
//       },
//       { $unwind: "$category" },
//       {
//         $project: {
//           _id: 0,
//           category: "$category.name",
//           color: "$category.color",
//           total: 1,
//         },
//       },
//     ]);

//     res.json(summary);
//   } catch (err) {
//     res.status(500).json({ message: "Error generating summary", error: err.message });
//   }
// };
