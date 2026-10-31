import { useState } from "react";

const API = "/api/productos";

function NuevoProductoForm({ onCreado }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMensaje("");

    if (!nombre.trim() || precio === "" || Number(precio) < 0) {
      setMensaje("Ingresá un nombre y un precio válido.");
      return;
    }

    const nuevoProducto = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: Number(precio),
      stock: stock === "" ? undefined : Number(stock),
      imagenUrl: imagenUrl.trim(),
    };

    try {
      setGuardando(true);

      const respuesta = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || "Error al crear el producto");
      }

      const productoCreado = datos.productoGuardado;
      
      onCreado(productoCreado);
      setMensaje(`¡Producto creado correctamente! ID: ${productoCreado._id}`);

      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setImagenUrl("");
    } catch (err) {
      setMensaje(`No se pudo crear: ${err.message}`);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <section className="seccion--admin">
      <form className="formulario-producto" onSubmit={handleSubmit}>
        <h1 className="formulario-producto__titulo">
          Nuevo producto
        </h1>

        <div className="formulario-producto__campo">
          <label htmlFor="nombre">Nombre *</label>
          <input
            id="nombre"
            type="text"
            placeholder="Ej: Aparador Uspallata"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </div>

        <div className="formulario-producto__campo">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            placeholder="Contanos sobre este mueble..."
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
          />
        </div>

        <div className="formulario-producto__campo">
          <label htmlFor="precio">Precio *</label>
          <input
            id="precio"
            type="number"
            min="0"
            step="0.01"
            placeholder="Ej: 220000"
            value={precio}
            onChange={(event) => setPrecio(event.target.value)}
            required
          />
        </div>

        <div className="formulario-producto__campo">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            type="number"
            min="0"
            step="1"
            placeholder="Cantidad disponible"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
          />
        </div>

        <div className="formulario-producto__campo">
          <label htmlFor="imagenUrl">URL de imagen</label>
          <input
            id="imagenUrl"
            type="text"
            placeholder="https://..."
            value={imagenUrl}
            onChange={(event) => setImagenUrl(event.target.value)}
          />
        </div>

        <button
          className="formulario-producto__boton"
          type="submit"
          disabled={guardando}
        >
          {guardando ? "Guardando..." : "Crear producto"}
        </button>

        {mensaje && (
          <p className="formulario-producto__mensaje" role="status">
            {mensaje}
          </p>
        )}
      </form>
    </section>
  );
}

export default NuevoProductoForm;
