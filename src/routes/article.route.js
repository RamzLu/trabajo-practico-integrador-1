import { Router } from "express";
import {
  getAllArticle,
  ArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByUser,
  getArticleByIdForUser,
} from "../controllers/article.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { ownerOrAdmin } from "../middleware/authOwnerMiddleware.js";
import { validator } from "../middleware/validator.js";
import {
  createArticleValidations,
  deleteArticleValidations,
  getArticleByIDValidation,
  updateArticleValidations,
} from "../middleware/validations/article.validations.js";
export const articleRoute = Router();

articleRoute.post(
  "/articles",
  authMiddleware,
  createArticleValidations,
  validator,
  createArticle
);
articleRoute.get("/articles", authMiddleware, getAllArticle);

articleRoute.get(
  "/articles/:id",
  authMiddleware,
  getArticleByIDValidation,
  validator,
  ArticleById
);

articleRoute.get("/articles/user", authMiddleware, getArticlesByUser);

articleRoute.get(
  "/articles/user/:id",
  authMiddleware,
  getArticleByIDValidation,
  validator,
  getArticleByIdForUser
);

articleRoute.put(
  "/articles/:id",
  updateArticleValidations,
  validator,
  authMiddleware,
  ownerOrAdmin,
  updateArticle
);

articleRoute.delete(
  "/articles/:id",
  authMiddleware,
  ownerOrAdmin,
  deleteArticleValidations,
  validator,
  deleteArticle
);
