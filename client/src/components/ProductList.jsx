import { useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ productos, cargando, error, onAgregar, onVerDetalle }) {
  const [busqueda, setBusqueda] = useState("");

  const filtrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section id="catalogo">
      <h2 className="seccion__titulo">Nuestros productos</h2>

      <div className="buscador">
        <input
          type="search"
          id="buscador"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {cargando && <p className="estado-carga">Cargando productos…</p>}
      {error && <p className="error">No pudimos cargar los productos: {error}</p>}
      {!cargando && !error && filtrados.length === 0 && (
        <p className="estado-carga">No encontramos productos para "{busqueda}".</p>
      )}

      <div id="catalogo-container">
        {filtrados.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAgregar={onAgregar}
            onVerDetalle={onVerDetalle}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
