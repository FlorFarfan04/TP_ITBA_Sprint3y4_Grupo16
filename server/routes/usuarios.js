import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import { verificarToken } from "../middleware/auth.js";

const usuariosRouter = Router();

usuariosRouter.post("/registro", async (req, res, next) => {
  const { nombre, email, password } = req.body;

  if (
    (email != null && typeof email !== "string") ||
    (password != null && typeof password !== "string")
  ) {
    const error = new Error("Datos inválidos");
    error.status = 400;
    return next(error);
  }

  const usuario = await Usuario.create({ nombre, email, password });
  res.status(201).json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
  });
});

usuariosRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
    const error = new Error("Datos inválidos");
    error.status = 400;
    return next(error);
  }

  const usuario = await Usuario.findOne({ email: email.toLowerCase().trim() });
  const coincide = usuario ? await bcrypt.compare(password, usuario.password) : false;

  if (!usuario || !coincide) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    return next(error);
  }

  const token = jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    token,
    usuario: {
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    },
  });
});

usuariosRouter.get("/perfil", verificarToken, async (req, res, next) => {
  const usuario = await Usuario.findById(req.usuario.id);
  if (!usuario) {
    const error = new Error("No autorizado");
    error.status = 401;
    return next(error);
  }

  res.status(200).json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
  });
});

export default usuariosRouter;
