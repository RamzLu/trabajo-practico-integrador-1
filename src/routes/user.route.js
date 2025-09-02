import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";

export const userRoute = Router();

userRoute.get("/users", getAllUsers);
userRoute.get("/users/:id", getUserById);
userRoute.post("/users", createUser);
userRoute.put("/users/:id", updateUser);
userRoute.delete("/users/:id", deleteUser);
