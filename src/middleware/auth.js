import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookie.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.usuario = decoded;
  next();
};
