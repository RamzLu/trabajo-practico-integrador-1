import { Router } from "express";
import {
  getAllArticle,
  ArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";

export const articleRoute = Router();

articleRoute.get("/articles", getAllArticle);
articleRoute.get("/articles/:id", ArticleById);
articleRoute.post("/articles", createArticle);
articleRoute.put("/articles/:id", updateArticle);
articleRoute.delete("/articles/:id", deleteArticle);
