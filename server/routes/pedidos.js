import { Router } from "express";
import mongoose from "mongoose";
import Pedido from "../models/Pedido.js";
import Product from "../models/Product.js";
import { verificarToken } from "../middleware/auth.js";

const pedidosRouter = Router();

pedidosRouter.get("/", verificarToken, async (req, res, next) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.usuario.id }).sort({ createdAt: -1 });
    res.status(200).json(pedidos);
  } catch (error) {
    next(error);
  }
});

pedidosRouter.post("/", verificarToken, async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0 || items.some((item) =>
      !item || !mongoose.isValidObjectId(item.producto) || !Number.isInteger(item.cantidad) || item.cantidad < 1
    )) {
      const error = new Error("El carrito no contiene productos válidos");
      error.status = 400;
      return next(error);
    }

    const cantidades = new Map();
    for (const item of items) cantidades.set(String(item.producto), (cantidades.get(String(item.producto)) || 0) + item.cantidad);
    const productos = await Product.find({ _id: { $in: [...cantidades.keys()] } });
    if (productos.length !== cantidades.size) {
      const error = new Error("Uno o más productos ya no están disponibles");
      error.status = 400;
      return next(error);
    }

    const lineas = productos.map((producto) => ({
      producto: producto._id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: cantidades.get(String(producto._id)),
    }));
    const pedido = await Pedido.create({
      usuario: req.usuario.id,
      items: lineas,
      total: lineas.reduce((suma, item) => suma + item.precio * item.cantidad, 0),
    });
    res.status(201).json(pedido);
  } catch (error) {
    next(error);
  }
});

export default pedidosRouter;
