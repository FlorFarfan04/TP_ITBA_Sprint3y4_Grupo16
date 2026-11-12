import express from "express";
import cors from "cors";
import conectarDB from "./db.js";
import productosRouter from "./routes/productos.routes.js";
import categoriasRouter from "./routes/categorias.js";
import usuariosRouter from "./routes/usuarios.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/productos", productosRouter);
app.use("/api/categorias", categoriasRouter);
app.use("/api/usuarios", usuariosRouter);

app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ") || "Datos inválidos";
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "El id no es válido";
  } else if (err.code === 11000) {
    statusCode = 409;
    message = "Ya existe un recurso con esos datos";
  }

  if (statusCode === 500) {
    console.error(err);
    message = "Error interno del servidor";
  }

  res.status(statusCode).json({ error: message });
});

conectarDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
});