import "dotenv/config";
import mongoose from "mongoose";
import conectarDB from "./db.js";
import Product from "./models/Product.js";
import productos from "./data/productos.js";

async function seed() {
  try {
    await conectarDB();

    const documentos = productos.map(({ id, precio, ...resto }) => ({
      ...resto,
      precio: Number(precio.replace("$", "").replace(/\./g, "")),
    }));

    const nombresExistentes = await Product.find(
      { nombre: { $in: documentos.map((p) => p.nombre) } },
      { nombre: 1 }
    );

    const nombres = nombresExistentes.map((p) => p.nombre);

    const productosNuevos = documentos.filter(
      (p) => !nombres.includes(p.nombre)
    );

    if (productosNuevos.length === 0) {
      console.log("Todos los productos originales ya estaban cargados.");
      return;
    }

    const creados = await Product.insertMany(productosNuevos);

    console.log(
      `🌱 Se agregaron ${creados.length} productos a ${mongoose.connection.name}`
    );
  } finally {
    await mongoose.disconnect();
  }
}

seed().catch((error) => {
  console.error("Falló el seed:", error);
  process.exitCode = 1;
});


