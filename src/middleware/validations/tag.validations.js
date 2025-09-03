import { body, param } from "express-validator";
import { Tag } from "../../models/tag.model.js";

export const createTagValidations = [
  body("name")
    .notEmpty()
    .withMessage("El nombre de la etiqueta es obligatorio.")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto.")
    .isLength({ min: 2, max: 25 })
    .withMessage("El nombre debe tener entre 2 y 25 caracteres.")
    .trim()
    .custom(async (value) => {
      const tag = await Tag.findOne({ where: { name: value } });
      if (tag) {
        throw new Error("Ya existe una etiqueta con este nombre.");
      }
      return true;
    }),
];

export const updateTagValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El ID de la etiqueta debe ser un entero positivo.")
    .custom(async (value) => {
      const tag = await Tag.findByPk(value);
      if (!tag) {
        throw new Error("La etiqueta que intenta actualizar no existe.");
      }
      return true;
    }),

  body("name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto.")
    .isLength({ min: 2, max: 25 })
    .withMessage("El nombre debe tener entre 2 y 25 caracteres.")
    .trim()
    .custom(async (value, { req }) => {
      const tag = await Tag.findOne({ where: { name: value } });
      if (tag && tag.id !== parseInt(req.params.id)) {
        throw new Error("Ya existe otra etiqueta con este nombre.");
      }
      return true;
    }),
];

const tagIdValidation = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El ID de la etiqueta debe ser un entero positivo.")
    .custom(async (value) => {
      const tag = await Tag.findByPk(value);
      if (!tag) {
        throw new Error("La etiqueta no existe.");
      }
      return true;
    }),
];

export const getTagByIDValidation = tagIdValidation;
export const deleteTagValidations = tagIdValidation;
