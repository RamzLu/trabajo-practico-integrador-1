export const authAdminMiddleware = (req, res, next) => {
  const userLogged = req.usuario;
  if (!decode.role !== "admin") {
    return res.status(401).json({
      msg: "Usted no tiene los permisos para hacer la petición",
    });
  }
  next();
};
