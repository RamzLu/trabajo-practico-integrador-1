import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  // updateUser,
} from "../controllers/user.controller.js";
import { authAdminMiddleware } from "../middleware/authAdmin.js";
import { authMiddleware } from "../middleware/auth.js";
import validator from "../middleware/validator.js";
import {
  createUserValidation,
  deleteUserValidation,
  getUserByIdValidation,
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

userRoute.post(
  "/users",
  authAdminMiddleware,
  createUserValidation,
  validator,
  createUser
);

// userRoute.put("/users/:id", authMiddleware, authAdminMiddleware, updateUser);

userRoute.delete(
  "/users/:id",
  authAdminMiddleware,
  deleteUserValidation,
  validator,
  deleteUser
);
