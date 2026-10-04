import { useState } from "react";

function ProductDetail({ producto, onAgregar, onVolver }) {
  const [agregado, setAgregado] = useState(false);

  function manejarAgregar() {
    onAgregar(producto);
    setAgregado(true);
  }

  return (
    <section className="seccion">
      <div className="contenedor detalle-producto" id="detalle">
        <div className="detalle-producto__visual">
          <img
            className="detalle-producto__imagen"
            src={`/${producto.imagen}`}
            alt={producto.nombre}
          />
        </div>

        <div className="detalle-producto__descripcion">
          <h1>{producto.nombre}</h1>
          <p className="detalle-producto__info">{producto.info}</p>
          <p><strong>Material:</strong> {producto.materiales}</p>
          <p><strong>Medidas:</strong> {producto.medidas}</p>
          {producto.acabado.trim() !== "" && (
            <p><strong>Acabado: </strong>{producto.acabado}</p>
          )}
          <p><strong>Precio: </strong>{producto.precio}</p>

          <div className="detalle-producto__acciones">
            <button className="boton boton--primario" onClick={manejarAgregar}>
              Añadir al carrito
            </button>
            <button className="boton boton--salvia" onClick={onVolver}>
              Volver al catálogo
            </button>
          </div>

          <p
            className={
              "confirmacion-carrito" + (agregado ? " confirmacion-carrito--visible" : "")
            }
          >
            ¡Lo sumamos al carrito!
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
