import ProductCard from "./ProductCard";

function Home({ productos, cargando, error, onNavegar, onAgregar, onVerDetalle }) {
  const destacados = productos.filter((p) => p.destacado);

  return (
    <>
      <section className="hero">
        <div className="contenedor hero__contenido">
          <div className="hero__texto">
            <p>Cada pieza envejece con gracia, desarrollando carácter mientras mantiene su belleza esencial.</p>
            <h1 className="hero__titulo">Muebles que alimentan el alma, no solo el espacio.</h1>
            <p className="hero__parrafo">
              Existimos en la intersección entre herencia e innovación. Cada pieza cuenta una historia de artesanía que honra el pasado mientras abraza el futuro.
            </p>
            <div className="hero__acciones">
              <a
                href="#"
                className="boton boton--primario"
                onClick={(e) => { e.preventDefault(); onNavegar("productos"); }}
              >
                Ver catálogo
              </a>
              <a
                href="#"
                className="boton boton--salvia"
                onClick={(e) => { e.preventDefault(); onNavegar("contacto"); }}
              >
                Escribinos
              </a>
            </div>
          </div>
          <div className="hero__galeria">
            <div className="hero__foto hero__foto--grande">
              <img src="/img/sofaPatagonia.png" alt="Sofá Patagonia" />
            </div>
            <div className="hero__foto">
              <img src="/img/sillonCopacabana.png" alt="Sillón Copacabana" />
            </div>
            <div className="hero__foto">
              <img src="/img/butacaMendoza.png" alt="Butaca Mendoza" />
            </div>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="contenedor">
          <h2 className="seccion__titulo">Piezas destacadas</h2>
          {cargando && <p className="estado-carga">Cargando productos…</p>}
          {error && <p className="error">No pudimos cargar los productos: {error}</p>}
          <div className="grilla-productos" id="destacados">
            {destacados.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                onAgregar={onAgregar}
                onVerDetalle={onVerDetalle}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
