import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  nombre: { type: String, required: true },
  precio: { type: Number, required: true, min: 0 },
  cantidad: { type: Number, required: true, min: 1 },
}, { _id: false });

const pedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  items: { type: [itemSchema], required: true, validate: { validator: (items) => items.length > 0, message: "El pedido debe tener productos" } },
  total: { type: Number, required: true, min: 0 },
}, { timestamps: true });

export default mongoose.model("Pedido", pedidoSchema);
