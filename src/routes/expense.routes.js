import { Router } from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  // getSummary,
} from "../controllers/expense.controller.js";

const router = Router();

router.post("/", createExpense);
router.get("/", getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
// router.get("/summary", getSummary);

export default router;
