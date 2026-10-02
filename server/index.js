import express from "express";
import productosRoutes from "./routes/productos.routes.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
})

app.use("/api/productos", productosRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  console.error({statusCode, message, stack: err.stack});

  res.status(statusCode).json({ error: message });

})


app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
