import { Router } from "express";
import {
  createArticleTag,
  deleteArticleTag,
} from "../controllers/articleTag.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { ownerOnly } from "../middleware/authOwnerMiddleware.js";
import {
  createArticleTagValidations,
  deleteArticleTagValidations,
} from "../middleware/validations/articleTags.validations.js";
import { validator } from "../middleware/validator.js";
export const articleTagRoute = Router();

articleTagRoute.post(
  "/articles-tags/:id",
  authMiddleware,
  ownerOnly,
  createArticleTagValidations,
  validator,
  createArticleTag
);
articleTagRoute.delete(
  "/articles-tags/:id",
  authMiddleware,
  ownerOnly,
  deleteArticleTagValidations,
  validator,
  deleteArticleTag
);
