function ProductCard({ producto, onAgregar, onVerDetalle }) {
  const precioFormateado = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(producto.precio);

  return (
    <article className="producto">
      <img
      src={
      producto.imagenUrl ||
      producto.imagen ||
      "/img/escritorioCosta.png"
      }
      alt={producto.nombre}
      onError={(event) => {
      const imagen = event.currentTarget;

      if (imagen.dataset.fallback === "true") {
      imagen.style.display = "none";
      return;
      }

      imagen.dataset.fallback = "true";
      imagen.src = "/img/escritorioCosta.png";
      }}
      />

      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p className="precio">{precioFormateado}</p>

      <button
        className="enlace-ver-mas"
        onClick={() => onVerDetalle(producto)}
      >
        Ver detalle
      </button>

      <button
        className="boton boton--primario"
        onClick={() => onAgregar(producto)}
        disabled={producto.stock != null && producto.stock <= 0}
      >
        {producto.stock != null && producto.stock <= 0
          ? "Sin stock"
          : "Agregar al carrito"}
      </button>
    </article>
  );
}

export default ProductCard;
