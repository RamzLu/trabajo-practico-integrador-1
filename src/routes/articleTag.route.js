import { Router } from "express";
import {
  createArticleTag,
  getAllArticleTag,
  getArticleTagById,
  updateArticleTag,
  deleteArticleTag,
} from "../controllers/articleTag.controller.js";

export const articleTagRoute = Router();

articleTagRoute.get("/articles-tags", getAllArticleTag);
articleTagRoute.get("/articles-tags/:id", getArticleTagById);
articleTagRoute.post("/articles-tags", createArticleTag);
articleTagRoute.put("/articles-tags/:id", updateArticleTag);
articleTagRoute.delete("/articles-tags/:id", deleteArticleTag);
