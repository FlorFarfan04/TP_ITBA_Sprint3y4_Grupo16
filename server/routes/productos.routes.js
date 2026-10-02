import express, { Router } from "express";
import productos from "../data/productos.js";

const productosRouter = express.Router();


productosRouter.get("/", (req, res) => {
  res.json(productos);
});

productosRouter.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
});

export default productosRouter;