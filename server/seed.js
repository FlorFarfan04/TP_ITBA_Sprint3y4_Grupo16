import mongoose from "mongoose";
import conectarDB from "./db.js";
import Product from "./models/Product.js";
import Categoria from "./models/Categoria.js";
import productos from "./data/productos.js";

const NOMBRES_CATEGORIAS = ["Sillas", "Mesas", "Sillones", "Guardado"];

const categoriaPorProducto = {
  "Aparador Uspallata": "Guardado",
  "Biblioteca Recoleta": "Guardado",
  "Butaca Mendoza": "Sillones",
  "Sillón Copacabana": "Sillones",
  "Mesa de Centro Araucaria": "Mesas",
  "Mesa de Noche Aconcagua": "Mesas",
  "Sofá Patagonia": "Sillones",
  "Mesa Comedor Pampa": "Mesas",
  "Sillas Córdoba": "Sillas",
  "Escritorio Costa": "Mesas",
  "Silla de Trabajo Belgrano": "Sillas",
};

async function seed() {
  try {
    await conectarDB();

    const categorias = {};
    for (const nombre of NOMBRES_CATEGORIAS) {
      let categoria = await Categoria.findOne({ nombre });
      if (!categoria) {
        categoria = await Categoria.create({ nombre });
      }
      categorias[nombre] = categoria._id;
    }

    const documentos = productos.map(({ id, precio, ...resto }) => ({
      ...resto,
      precio: Number(precio.replace("$", "").replace(/\./g, "")),
      categoria: categorias[categoriaPorProducto[resto.nombre]],
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
    } else {
      const creados = await Product.insertMany(productosNuevos);
      console.log(
        `🌱 Se agregaron ${creados.length} productos a ${mongoose.connection.name}`
      );
    }

    await Product.bulkWrite(
      documentos.map((p) => ({
        updateOne: {
          filter: { nombre: p.nombre },
          update: { $set: { categoria: p.categoria } },
        },
      }))
    );

    console.log("Categorías asignadas a los productos del catálogo.");
  } finally {
    await mongoose.disconnect();
  }
}

seed().catch((error) => {
  console.error("Falló el seed:", error);
  process.exitCode = 1;
});
