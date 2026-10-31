import ProductList from "../components/ProductList";

function Catalogo({ productos, onAgregar, onVerDetalle, error, cargando }) {

  return (
    <ProductList
      productos={productos}
      onAgregar={onAgregar}
      onVerDetalle={onVerDetalle}
      error={error}
      cargando={cargando}
    />
  );
}

export default Catalogo;