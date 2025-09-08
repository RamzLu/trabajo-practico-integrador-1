import { body, param } from "express-validator";
import { Article } from "../../models/article.model.js";
import { Tag } from "../../models/tag.model.js";
import { ArticleTag } from "../../models/articleTag.model.js";

export const createArticleTagValidations = [
  body("article_id")
    .notEmpty()
    .withMessage("El ID del artículo es obligatorio.")
    .isInt({ gt: 0 })
    .withMessage("El ID del artículo debe ser un entero positivo.")
    .custom(async (value) => {
      const article = await Article.findByPk(value);
      if (!article) {
        throw new Error("El artículo especificado no existe.");
      }
      return true;
    }),

  body("tag_id")
    .notEmpty()
    .withMessage("El ID de la etiqueta es obligatorio.")
    .isInt({ gt: 0 })
    .withMessage("El ID de la etiqueta debe ser un entero positivo.")
    .custom(async (value, { req }) => {
      const tag = await Tag.findByPk(value);
      if (!tag) {
        throw new Error("La etiqueta especificada no existe.");
      }
      const association = await ArticleTag.findOne({
        where: {
          article_id: req.body.article_id,
          tag_id: value,
        },
      });

      if (association) {
        throw new Error("Esta etiqueta ya está asociada a este artículo.");
      }

      return true;
    }),
];

export const deleteArticleTagValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El ID del perfil debe ser un entero positivo.")
    .custom(async (value) => {
      const article = await Article.findByPk(value);
      if (!article) {
        throw new Error("El articulo no existe.");
      }
      return true;
    }),

  body("article_id")
    .notEmpty()
    .withMessage("El ID del artículo es obligatorio.")
    .isInt({ gt: 0 })
    .withMessage("El ID del artículo debe ser un entero positivo."),

  body("tag_id")
    .notEmpty()
    .withMessage("El ID de la etiqueta es obligatorio.")
    .isInt({ gt: 0 })
    .withMessage("El ID de la etiqueta debe ser un entero positivo.")
    .custom(async (value, { req }) => {
      const association = await ArticleTag.findOne({
        where: {
          article_id: req.body.article_id,
          tag_id: value,
        },
      });

      if (!association) {
        throw new Error(
          "La asociación entre este artículo y esta etiqueta no existe."
        );
      }

      return true;
    }),
];
