import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, "")}/api/productos`
  : "/api/productos";

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
    return "Revisá los campos numéricos. Deben contener números válidos.";
  }

  return "No pudimos guardar el producto. Revisá los datos e intentá nuevamente.";
}

export default function ProductoForm({ onGuardado }) {
  const { id } = useParams();
  const esEdicion = Boolean(id);
  const navigate = useNavigate();

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
        const respuesta = await fetch(`${API}/${id}`);
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


  console.log("API configurada:", API);
  console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

  
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
        esEdicion ? `${API}/${id}` : API,
        {
          method: esEdicion ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || "No se pudo guardar el producto");
      }

      const productoGuardado = esEdicion
      ? datos.producto
      : datos.productoGuardado;

      onGuardado(productoGuardado);
      navigate(`/productos/${productoGuardado._id}`);

    } catch (err) {
      setError(obtenerMensajeError(err));
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
        className="formulario-producto"
        onSubmit={handleSubmit}
      >
        <h1 className="formulario-producto__titulo">
          {esEdicion ? "Editar producto" : "Nuevo producto"}
        </h1>

        <div className="formulario-producto__campo">
          <label htmlFor="nombre">Nombre *</label>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formulario-producto__campo">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="formulario-producto__campo">
          <label htmlFor="precio">Precio *</label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="0"
            step="0.01"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="formulario-producto__campo">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={handleChange}
          />
        </div>

        <div className="formulario-producto__campo">
          <label htmlFor="imagenUrl">URL de imagen</label>
          <input
            id="imagenUrl"
            name="imagenUrl"
            value={form.imagenUrl}
            onChange={handleChange}
            placeholder="/img/escritorioCosta.png"
          />
        </div>

        <div className="formulario-producto__campo">
          <label htmlFor="medidas">Medidas</label>
          <input
            id="medidas"
            name="medidas"
            value={form.medidas}
            onChange={handleChange}
            placeholder="20 cm x 30 cm x 20 cm"
          />
        </div>

        <div className="formulario-producto__campo">
          <label htmlFor="materiales">Materiales</label>
          <input
            id="materiales"
            name="materiales"
            value={form.materiales}
            onChange={handleChange}
          />
        </div>

        <div className="formulario-producto__campo">
          <label htmlFor="acabado">Acabado</label>
          <input
            id="acabado"
            name="acabado"
            value={form.acabado}
            onChange={handleChange}
          />
        </div>

        <div className="formulario-producto__campo">
          <label htmlFor="info">Información adicional</label>
          <textarea
            id="info"
            name="info"
            value={form.info}
            onChange={handleChange}
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button
          className="formulario-producto__boton"
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
