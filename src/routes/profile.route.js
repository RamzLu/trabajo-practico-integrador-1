import { Router } from "express";
import {
  getAllProfiles,
  getProfileById,
} from "../controllers/profile.controller.js";
import { validator } from "../middleware/validator.js";
import { getProfileByIDValidation } from "../middleware/validations/profile.validations.js";

export const profileRoute = Router();
profileRoute.get("/profile", getAllProfiles);
profileRoute.get(
  "profile/:id",
  getProfileByIDValidation,
  validator,
  getProfileById
);
