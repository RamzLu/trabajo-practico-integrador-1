import { Router } from "express";
import {
  getAllTag,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";

export const tagRoute = Router();

tagRoute.get("/tags", getAllTag);
tagRoute.get("/tags/:id", getTagById);
tagRoute.post("/tags", createTag);
tagRoute.put("/tags/:id", updateTag);
tagRoute.delete("/tags/:id", deleteTag);
