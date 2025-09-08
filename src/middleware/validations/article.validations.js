import { body, param } from "express-validator";
import { Op } from "sequelize";
import { Article } from "../../models/article.model.js";
import { User } from "../../models/user.model.js";

export const createArticleValidations = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio.")
    .isString()
    .withMessage("El título debe ser una cadena de texto.")
    .isLength({ min: 5, max: 100 })
    .withMessage("El título debe tener entre 5 y 100 caracteres.")
    .trim()
    .custom(async (value) => {
      const article = await Article.findOne({ where: { title: value } });
      if (article) {
        throw new Error("Ya existe un artículo con este título.");
      }
      return true;
    }),

  body("content")
    .notEmpty()
    .withMessage("El contenido es obligatorio.")
    .isString()
    .withMessage("El contenido debe ser una cadena de texto.")
    .isLength({ min: 10 })
    .withMessage("El contenido debe tener al menos 10 caracteres.")
    .trim(),

  body("excerpt")
    .optional()
    .isString()
    .withMessage("El extracto debe ser una cadena de texto.")
    .isLength({ max: 200 })
    .withMessage("El extracto no puede exceder los 200 caracteres.")
    .trim(),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser 'published' o 'archived'."),

  body("birth_date")
    .optional()
    .isISO8601()
    .withMessage("El formato de la fecha no es válido (YYYY-MM-DD).")
    .toDate(),

  body("user_id")
    .notEmpty()
    .withMessage("El ID del autor es obligatorio.")
    .isInt({ gt: 0 })
    .withMessage("El ID del autor debe ser un entero positivo.")
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        throw new Error("El autor especificado no existe.");
      }
      return true;
    }),
];

export const updateArticleValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El ID del artículo debe ser un entero positivo."),

  body("title")
    .optional()
    .isString()
    .withMessage("El título debe ser una cadena de texto.")
    .isLength({ min: 5, max: 100 })
    .withMessage("El título debe tener entre 5 y 100 caracteres.")
    .trim()
    .custom(async (value, { req }) => {
      const article = await Article.findOne({
        where: {
          title: value,
          id: { [Op.ne]: req.params.id },
        },
      });
      if (article) {
        throw new Error("Ya existe otro artículo con este título.");
      }
      return true;
    }),

  body("content")
    .optional()
    .isString()
    .withMessage("El contenido debe ser una cadena de texto.")
    .isLength({ min: 10 })
    .withMessage("El contenido debe tener al menos 10 caracteres.")
    .trim()
    .custom(async (value, { req }) => {
      const article = await Article.findOne({
        where: {
          content: value,
          id: { [Op.ne]: req.params.id },
        },
      });
      if (article) {
        throw new Error("Ya existe otro artículo con este mismo contenido.");
      }
      return true;
    }),

  body("excerpt")
    .optional()
    .isString()
    .withMessage("El extracto debe ser una cadena de texto.")
    .isLength({ max: 200 })
    .withMessage("El extracto no puede exceder los 200 caracteres.")
    .trim(),

  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado debe ser 'published' o 'archived'."),

  body("birth_date")
    .optional()
    .isISO8601()
    .withMessage("El formato de la fecha no es válido (YYYY-MM-DD).")
    .toDate(),

  body("user_id")
    .not()
    .exists()
    .withMessage("No se puede cambiar el autor de un artículo."),
];

const articleIdValidation = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El ID del artículo debe ser un entero positivo.")
    .custom(async (value) => {
      const article = await Article.findByPk(value);
      if (!article) {
        throw new Error("El artículo no existe.");
      }
      return true;
    }),
];

export const getArticleByIDValidation = articleIdValidation;
export const deleteArticleValidations = articleIdValidation;
