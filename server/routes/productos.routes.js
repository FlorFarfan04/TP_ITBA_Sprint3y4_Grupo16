import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const productosRouter = Router();

productosRouter.param("id", (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error("El id no es válido");
    error.status = 400;
    return next(error);
  }
  next();
});


productosRouter.get("/", async (req, res, next) => {
  try {
    const productos = await Product.find();
    res.status(200).json(productos);
  } catch (error) {
    console.log('Error al obtener los productos:', error.message);
    next(error);
  }
});

productosRouter.get("/:id", async (req, res, next) => {
  try {
    const producto = await Product.findById(req.params.id);
    if (!producto) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }
    res.status(200).json(producto);
  } catch (error) {
    console.log('Error al obtener el producto:', error.message);
    error.status = 400;
    next(error);
  }
});


productosRouter.post("/", async (req, res, next) => {
  try {
    const nuevoProducto = new Product(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json({ mensaje: 'Producto creado correctamente', productoGuardado });
  } catch (error) {
    console.log('Error al crear el producto:', error.message);
    error.status = 400;
    next(error);
  }
});


productosRouter.put("/:id", async (req, res, next) => {
  try {
    const producto = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!producto) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ mensaje: "Producto actualizado", producto });
  } catch (error) {
    console.log('Error al actualizar el producto:', error.message);
    error.status = 400;
    next(error);
  }
});


productosRouter.delete("/:id", async (req, res, next) => {
  try {
    const producto = await Product.findByIdAndDelete(req.params.id);
    if (!producto) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }
    res.status(200).json({ mensaje: "Producto eliminado", producto });
  } catch (error) {
    console.log('Error al eliminar el producto:', error.message);
    error.status = 400;
    next(error);
  }
});

export default productosRouter;