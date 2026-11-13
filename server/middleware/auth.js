import jwt from "jsonwebtoken";

export function verificarToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ") || !header.slice(7).trim()) {
    const error = new Error("No autorizado");
    error.status = 401;
    return next(error);
  }

  const token = header.slice(7).trim();

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    const error = new Error("No autorizado");
    error.status = 401;
    next(error);
  }
}

export function soloAdmin(req, res, next) {
  if (req.usuario?.rol === "admin") {
    return next();
  }
  const error = new Error("No tenés permiso");
  error.status = 403;
  next(error);
}
