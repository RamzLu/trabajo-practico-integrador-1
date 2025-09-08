import { body, param } from "express-validator";
import { Profile } from "../../models/profile.model.js";

export const createProfileValidations = [
  body("first_name")
    .notEmpty()
    .withMessage("El nombre es obligatorio.")
    .isString()
    .withMessage("El nombre debe ser una cadena de texto.")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres.")
    .trim(),
  body("last_name")
    .notEmpty()
    .withMessage("El apellido es obligatorio.")
    .isString()
    .withMessage("El apellido debe ser una cadena de texto.")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres.")
    .trim(),
  body("biography")
    .optional()
    .isString()
    .withMessage("La biografía debe ser una cadena de texto.")
    .isLength({ max: 500 })
    .withMessage("La biografía no puede exceder los 500 caracteres.")
    .trim(),

  body("avatar_url")
    .optional()
    .isURL()
    .withMessage("La URL del avatar no es válida."),

  body("birth_date")
    .optional()
    .isISO8601()
    .withMessage("El formato de la fecha de nacimiento no es válido.")
    .toDate(),
];

export const updateProfileValidations = [
  body("first_name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena de texto.")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres.")
    .trim(),

  body("last_name")
    .optional()
    .isString()
    .withMessage("El apellido debe ser una cadena de texto.")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres.")
    .trim(),

  body("biography")
    .optional()
    .isString()
    .withMessage("La biografía debe ser una cadena de texto.")
    .isLength({ max: 500 })
    .withMessage("La biografía no puede exceder los 500 caracteres.")
    .trim(),

  body("avatar_url")
    .optional()
    .isURL()
    .withMessage("La URL del avatar no es válida."),

  body("birth_date")
    .optional()
    .isISO8601()
    .withMessage("El formato de la fecha de nacimiento no es válido.")
    .toDate(),

  body("user_id")
    .not()
    .exists()
    .withMessage("No se puede cambiar el usuario asociado a un perfil."),
];

const profileIdValidation = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El ID del perfil debe ser un entero positivo.")
    .custom(async (value) => {
      const profile = await Profile.findByPk(value);
      if (!profile) {
        throw new Error("El perfil no existe.");
      }
      return true;
    }),
];

export const getProfileByIDValidation = profileIdValidation;
export const deleteProfileValidations = profileIdValidation;
