import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    destacado: { type: Boolean, default: false },
    nombre: { type: String, required: true, trim: true },
    imagen: { type: String, trim: true },
    imagenUrl: { type: String, trim: true },
    stock: { type: Number, min: [0, "El stock no puede ser negativo"],},
    medidas: { type: String, trim: true },
    materiales: { type: String, trim: true },
    acabado: { type: String, trim: true },
    descripcion: { type: String, trim: true },
    info: { type: String, trim: true },
   precio: { type: Number, required: true, min: [0, 'El precio no puede ser negativo'],
},
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);