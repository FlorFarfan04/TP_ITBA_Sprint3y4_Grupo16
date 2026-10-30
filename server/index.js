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

conectarDB().then(() => {
  app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
});