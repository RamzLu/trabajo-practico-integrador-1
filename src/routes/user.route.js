import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import { authAdminMiddleware } from "../middleware/authAdmin.js";
import { authMiddleware } from "../middleware/auth.js";
import { validator } from "../middleware/validator.js";
import {
  deleteUserValidation,
  getUserByIdValidation,
  updateUserValidation,
} from "../middleware/validations/user.validations.js";
export const userRoute = Router();

userRoute.get("/users", authMiddleware, authAdminMiddleware, getAllUsers);

userRoute.get(
  "/users/:id",
  authMiddleware,
  authAdminMiddleware,
  getUserByIdValidation,
  validator,
  getUserById
);

userRoute.put(
  "/users/:id",
  updateUserValidation,
  validator,
  authMiddleware,
  authAdminMiddleware,
  updateUser
);

userRoute.delete(
  "/users/:id",
  authMiddleware,
  authAdminMiddleware,
  deleteUserValidation,
  validator,
  deleteUser
);
