import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
  updateProfileAuthenticate,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { createUserValidation } from "../middleware/validations/user.validations.js";
import { validator } from "../middleware/validator.js";
import { authAdminMiddleware } from "../middleware/authAdmin.js";
import {
  createProfileValidations,
  updateProfileValidations,
} from "../middleware/validations/profile.validations.js";
export const authRouter = Router();

// rutas autenticadas
authRouter.post("/logout", authMiddleware, logout);
authRouter.get("/profile", authMiddleware, authAdminMiddleware, profile);
authRouter.put(
  "/profile",
  updateProfileValidations,
  validator,
  authMiddleware,
  updateProfileAuthenticate
);

// ruta pública
authRouter.post(
  "/register",
  createProfileValidations,
  createUserValidation,
  validator,
  register
);
authRouter.post("/login", login);
