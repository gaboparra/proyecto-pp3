import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import authorization from "../middlewares/authorization.js";

const router = Router();

router.get("/", authorization, getCategories);
router.post("/", authorization, createCategory);
router.put("/:id", authorization, updateCategory);
router.delete("/:id", authorization, deleteCategory);

export default router;
