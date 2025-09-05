import { Router } from "express";
import {
  getAllTag,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";
import { authAdminMiddleware } from "../middleware/authAdmin.js";
import { authMiddleware } from "../middleware/auth.js";
import validator from "../middleware/validator.js";
import {
  createTagValidations,
  deleteTagValidations,
  getTagByIDValidation,
  updateTagValidations,
} from "../middleware/validations/tag.validations.js";
export const tagRoute = Router();

tagRoute.get("/tags", authMiddleware, getAllTag);
tagRoute.get(
  "/tags/:id",
  authMiddleware,
  authAdminMiddleware,
  getTagByIDValidation,
  validator,
  getTagById
);
tagRoute.post(
  "/tags",
  authMiddleware,
  authAdminMiddleware,
  createTagValidations,
  validator,
  createTag
);
tagRoute.put(
  "/tags/:id",
  authMiddleware,
  authAdminMiddleware,
  updateTagValidations,
  validator,
  updateTag
);
tagRoute.delete(
  "/tags/:id",
  authMiddleware,
  authAdminMiddleware,
  deleteTagValidations,
  validator,
  deleteTag
);
