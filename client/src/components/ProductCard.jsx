function ProductCard({ producto, onAgregar, onVerDetalle }) {
  return (
    <article className="producto">
      <img src={`/${producto.imagen}`} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p className="precio">{producto.precio}</p>
      <button className="enlace-ver-mas" onClick={() => onVerDetalle(producto)}>
        Ver detalle
      </button>
      <button className="boton boton--primario" onClick={() => onAgregar(producto)}>
        Agregar al carrito
      </button>
    </article>
  );
}

export default ProductCard;
