import { Router } from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller.js";
import authorization from "../middlewares/authorization.js";
import isOwner from "../middlewares/isOwner.js";

const router = Router();

router.post("/", authorization, createExpense);
router.get("/", authorization, getExpenses);
router.put("/:id", authorization, updateExpense);
router.delete("/:id", authorization, deleteExpense);

export default router;
