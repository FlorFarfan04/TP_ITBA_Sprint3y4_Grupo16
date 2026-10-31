import express from "express";
import cors from "cors";
import conectarDB from "./db.js";
import productosRouter from "./routes/productos.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use("/api/productos", productosRouter);

app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = statusCode === 500 ? "Error interno del servidor" : err.message;

  if (statusCode === 500) console.error(err);

  res.status(statusCode).json({ error: message });
});

conectarDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
});