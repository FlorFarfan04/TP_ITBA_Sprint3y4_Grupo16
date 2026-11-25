import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ["cliente", "admin"], default: "cliente" },
  },
  { timestamps: true }
);

usuarioSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  if (/^\$2[aby]\$/.test(this.password)) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model("Usuario", usuarioSchema);
