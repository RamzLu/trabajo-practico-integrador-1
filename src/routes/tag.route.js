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

export const tagRoute = Router();

tagRoute.get("/tags", authMiddleware, getAllTag);
tagRoute.get("/tags/:id", authMiddleware, authAdminMiddleware, getTagById);
tagRoute.post("/tags", authMiddleware, authAdminMiddleware, createTag);
tagRoute.put("/tags/:id", authMiddleware, authAdminMiddleware, updateTag);
tagRoute.delete("/tags/:id", authMiddleware, authAdminMiddleware, deleteTag);
