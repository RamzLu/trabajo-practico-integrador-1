import { Router } from "express";
import {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteprofile,
} from "../controllers/profile.controller.js";

export const profileRoute = Router();

profileRoute.get("/profile", getAllProfiles);
profileRoute.get("/profile/:id", getProfileById);
profileRoute.post("/profile", createProfile);
profileRoute.put("/profile/:id", updateProfile);
profileRoute.delete("/profile/:id", deleteprofile);
