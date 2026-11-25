import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../api";
import { useAuth } from "../context/AuthContext.jsx";

const VACIO = {
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
  imagenUrl: "",
  medidas: "",
  materiales: "",
  acabado: "",
  info: "",
};

function obtenerMensajeError(error) {
  const mensaje = error.message?.toLowerCase() || "";

  if (mensaje.includes("nombre")) {
    return "Por favor, ingresá el nombre del producto.";
  }

  if (mensaje.includes("precio")) {
    return "Ingresá un precio válido para el producto.";
  }

  if (mensaje.includes("stock")) {
    return "Ingresá una cantidad de stock válida.";
  }

  if (mensaje.includes("required")) {
    return "Completá todos los campos obligatorios.";
  }

  if (mensaje.includes("cast to number")) {
    return "Revisá los campos numéricos.";
  }

  return "No pudimos guardar el producto. Revisá los datos e intentá nuevamente.";
}

export default function ProductoForm({ onGuardado }) {
  const { id } = useParams();
  const esEdicion = Boolean(id);
  const navigate = useNavigate();
  const { token } = useAuth();

  const [form, setForm] = useState(VACIO);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(esEdicion);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!esEdicion) {
      setForm(VACIO);
      setCargando(false);
      return;
    }

    async function cargarProducto() {
      try {
        const respuesta = await fetch(`${API_URL}/productos/${id}`);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(datos.error || "No se pudo cargar el producto");
        }

        setForm({
          nombre: datos.nombre ?? "",
          descripcion: datos.descripcion ?? "",
          precio: datos.precio ?? "",
          stock: datos.stock ?? "",
          imagenUrl: datos.imagenUrl ?? datos.imagen ?? "",
          medidas: datos.medidas ?? "",
          materiales: datos.materiales ?? "",
          acabado: datos.acabado ?? "",
          info: datos.info ?? "",
        });

      } catch (err) {
        setError(obtenerMensajeError(err));
      } finally {
        setCargando(false);
      }
    }

    cargarProducto();
  }, [id, esEdicion]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((actual) => ({
      ...actual,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const producto = {
      ...form,
      precio: Number(form.precio),
      stock: form.stock === "" ? undefined : Number(form.stock),
    };

    try {
      setGuardando(true);

      const respuesta = await fetch(
        esEdicion ? `${API_URL}/productos/${id}` : `${API_URL}/productos`,
        {
          method: esEdicion ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(producto),
        }
      );

      const texto = await respuesta.text();
      const datos = texto ? JSON.parse(texto) : {};

      if (!respuesta.ok) {
        throw new Error(
          datos.error || "No se pudo guardar el producto"
        );
      }

      const productoGuardado = esEdicion
        ? datos.producto
        : datos.productoGuardado;

      if (!productoGuardado) {
        throw new Error("El servidor no devolvió el producto guardado.");
      }

      onGuardado(productoGuardado);
      navigate(`/productos/${productoGuardado._id}`);

    } catch (err) {
      setError(obtenerMensajeError(err));
      console.error("Error al guardar producto:", err);
    } finally {
      setGuardando(false);
    }
  }

  if (cargando) {
    return <p>Cargando producto...</p>;
  }

  return (
    <section className="seccion--admin">
      <form
        className="formulario"
        onSubmit={handleSubmit}
      >
        <h1 className="formulario__titulo">
          {esEdicion ? "Editar producto" : "Nuevo producto"}
        </h1>

        <div className="formulario__campo">
          <label htmlFor="nombre">Nombre *</label>
          <input
            id="nombre"
            name="nombre"
            placeholder="Ej. Mesa de comedor Pampa"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formulario__campo">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Describí el producto"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="formulario__campo">
          <label htmlFor="precio">Precio *</label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="0"
            step="0.01"
            placeholder="Ej. 150000"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formulario__campo">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            placeholder="Ej. 5"
            value={form.stock}
            onChange={handleChange}
          />
        </div>

        <div className="formulario__campo">
          <label htmlFor="imagenUrl">URL de imagen</label>
          <input
            id="imagenUrl"
            name="imagenUrl"
            value={form.imagenUrl}
            onChange={handleChange}
            placeholder="/img/nombre-del-producto.png"
          />
        </div>

        <div className="formulario__campo">
          <label htmlFor="medidas">Medidas</label>
          <input
            id="medidas"
            name="medidas"
            value={form.medidas}
            onChange={handleChange}
            placeholder="Ej. 120 × 80 × 75 cm"
          />
        </div>

        <div className="formulario__campo">
          <label htmlFor="materiales">Materiales</label>
          <input
            id="materiales"
            name="materiales"
            placeholder="Ej. Madera maciza"
            value={form.materiales}
            onChange={handleChange}
          />
        </div>

        <div className="formulario__campo">
          <label htmlFor="acabado">Acabado</label>
          <input
            id="acabado"
            name="acabado"
            placeholder="Ej. Laca natural"
            value={form.acabado}
            onChange={handleChange}
          />
        </div>

        <div className="formulario__campo">
          <label htmlFor="info">Información adicional</label>
          <textarea
            id="info"
            name="info"
            placeholder="Detalles adicionales (opcional)"
            value={form.info}
            onChange={handleChange}
          />
        </div>

        {error && (
          <div className="mensaje-error" role="alert">
            <strong>¡Ups! Algo salió mal.</strong>
            <p>{error}</p>
          </div>
        )}

        <button
          className="formulario__boton"
          type="submit"
          disabled={guardando}
        >
          {guardando
            ? "Guardando..."
            : esEdicion
              ? "Guardar cambios"
              : "Crear producto"}
        </button>
      </form>
    </section>
  );
}
