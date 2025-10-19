import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMyProfile,
} from "../controllers/user.controller.js";
import authorization from "../middlewares/authorization.js";
import isOwner from "../middlewares/isOwner.js";

const router = Router();

router.get("/me", authorization, getMyProfile);
router.get("/", authorization, getUsers);
router.get("/:id", authorization, getUserById);
router.put("/:id", authorization, isOwner, updateUser);
router.delete("/:id", authorization, isOwner, deleteUser);

export default router;
