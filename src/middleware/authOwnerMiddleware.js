import { Article } from "../models/article.model.js";

export const ownerOrAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role === "admin") {
      return next();
    }
    const article = await Article.findOne({
      where: { id: req.params.id, user_id: user.id },
    });

    if (!article) {
      return res.status(403).json({
        message: "No tienes permiso para realizar esta acción en este recurso.",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor.", error: error.message });
  }
};

export const ownerOnly = async (req, res, next) => {
  const { user } = req;
  const article = await Article.findOne({
    where: { id: req.params.id, user_id: user.id },
  });
  if (!article) {
    return res.status(401).json({
      message: "no tienes permiso para acceder a este recurso",
    });
  }

  next();
};
