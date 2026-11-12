import { Router } from "express";
import Usuario from "../models/Usuario.js";

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

export default usuariosRouter;
