import { Router } from "express";
import Categoria from "../models/Categoria.js";

const categoriasRouter = Router();

categoriasRouter.get("/", async (req, res) => {
  const categorias = await Categoria.find().sort({ nombre: 1 });
  res.status(200).json(categorias);
});

categoriasRouter.post("/", async (req, res) => {
  const categoria = await Categoria.create(req.body);
  res.status(201).json(categoria);
});

export default categoriasRouter;
