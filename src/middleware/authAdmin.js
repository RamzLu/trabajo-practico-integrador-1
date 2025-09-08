export const authAdminMiddleware = (req, res, next) => {
  const user = req.user;
  if (user.role !== "admin") {
    return res.status(403).json({
      msg: "Usted no tiene los permisos para hacer la petición",
    });
  }
  next();
};
