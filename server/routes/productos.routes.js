import { Router } from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import Categoria from "../models/Categoria.js";

const productosRouter = Router();

async function validarCategoriaSiViene(categoria, next) {
  if (categoria === undefined || categoria === null || categoria === "") {
    return true;
  }
  if (!mongoose.isValidObjectId(categoria)) {
    const error = new Error("El id no es válido");
    error.status = 400;
    next(error);
    return false;
  }
  const existe = await Categoria.findById(categoria);
  if (!existe) {
    const error = new Error("La categoría no existe");
    error.status = 400;
    next(error);
    return false;
  }
  return true;
}

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
    const filtro = {};
    if (req.query.categoria) {
      if (!mongoose.isValidObjectId(req.query.categoria)) {
        const error = new Error("El id no es válido");
        error.status = 400;
        return next(error);
      }
      filtro.categoria = req.query.categoria;
    }
    const productos = await Product.find(filtro).populate("categoria", "nombre");
    res.status(200).json(productos);
  } catch (error) {
    console.log('Error al obtener los productos:', error.message);
    next(error);
  }
});

productosRouter.get("/:id", async (req, res, next) => {
  try {
    const producto = await Product.findById(req.params.id).populate("categoria", "nombre");
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
    if (!(await validarCategoriaSiViene(req.body.categoria, next))) return;
    const nuevoProducto = new Product(req.body);
    const productoGuardado = await nuevoProducto.save();
    const datos = productoGuardado.toObject();
    res.status(201).json({
      ...datos,
      mensaje: "Producto creado correctamente",
      productoGuardado: datos,
    });
  } catch (error) {
    console.log('Error al crear el producto:', error.message);
    error.status = 400;
    next(error);
  }
});


productosRouter.put("/:id", async (req, res, next) => {
  try {
    if (!(await validarCategoriaSiViene(req.body.categoria, next))) return;
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