import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductDetail({ producto, onAgregar, onVolver, onEliminar }) {
  const [agregado, setAgregado] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const navigate = useNavigate();

  // Los productos originales usan "imagen".
  // Los nuevos usan "imagenUrl".
  const imagenProducto =
    producto.imagenUrl || producto.imagen || "/img/escritorioCosta.png";

  const rutaImagen = imagenProducto.startsWith("http")
    ? imagenProducto
    : imagenProducto.startsWith("/")
      ? imagenProducto
      : `/${imagenProducto}`;

  function manejarErrorImagen(event) {
  const imagen = event.currentTarget;

  if (imagen.dataset.fallback === "true") {
    imagen.style.display = "none";
    return;
  }

  imagen.dataset.fallback = "true";
  imagen.src = "/img/escritorioCosta.png";
}

  function manejarAgregar() {
    onAgregar(producto);
    setAgregado(true);
  }

  async function manejarEliminar() {
  await onEliminar(producto._id);
}

  const precioFormateado = Number(producto.precio).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  return (
    <section className="seccion">
      <div className="contenedor detalle-producto" id="detalle">

        <div className="detalle-producto__visual">
          <img
            className="detalle-producto__imagen"
            src={rutaImagen}
            alt={producto.nombre}
            onError={manejarErrorImagen}
          />
        </div>

        <div className="detalle-producto__descripcion">

          <h1>{producto.nombre}</h1>

          <p className="detalle-producto__info">
            {producto.descripcion || "Sin descripción disponible."}
          </p>

          {producto.info && (
            <p>{producto.info}</p>
          )}

          <div className="detalle-producto__caracteristicas">

            {producto.medidas && (
              <p>
                <strong>Medidas: </strong>
                {producto.medidas}
              </p>
            )}

            {producto.materiales && (
              <p>
                <strong>Materiales: </strong>
                {producto.materiales}
              </p>
            )}

            {producto.acabado && (
              <p>
                <strong>Acabado: </strong>
                {producto.acabado}
              </p>
            )}

            <p>
              <strong>Stock: </strong>
              {producto.stock ?? "No especificado"} 
              {producto.stock != null ? " unidades" : ""}
            </p>

          </div>

          <p className="precio">
            <strong>Precio: </strong>
            {precioFormateado}
          </p>

          <div className="detalle-producto__acciones">

            <button
              className="boton boton--primario"
              onClick={manejarAgregar}
              disabled={producto.stock != null && producto.stock <= 0}
            >
              {producto.stock != null && producto.stock <= 0
                ? "Sin stock"
                : "Añadir al carrito"}
            </button>

            <button
            className="boton boton--salvia"
            onClick={() => navigate(`/admin/editar-producto/${producto._id}`)}
            >
              Editar producto
              </button>

            <button
              className="boton boton--salvia"
              onClick={onVolver}
            >
              Volver al catálogo
            </button>

            {confirmando ? (
            <div>
              <p>
              ¿Eliminar "{producto.nombre}"? Esta acción no se puede deshacer.
              </p>

            <button className="boton boton--primario" onClick={manejarEliminar}>
              Sí, eliminar
            </button>

            <button className="boton boton--eliminar" onClick={() => setConfirmando(false)}>
              Cancelar
            </button>
            </div>
            ) : (
            <button className="boton boton--eliminar" onClick={() => setConfirmando(true)}>
            Eliminar producto
            </button>
            )}
            
          </div>

          {agregado && (
            <p className="confirmacion-carrito confirmacion-carrito--visible">
              ¡Lo sumamos al carrito!
            </p>
          )}

        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
