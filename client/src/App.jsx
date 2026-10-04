import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";

const API_URL = "http://localhost:3000/api/productos";

function App() {
  
  const [vista, setVista] = useState("inicio");
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) {
          throw new Error("El servidor respondió: " + respuesta.status);
        }
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    }
    cargarProductos();
  }, []);

  function agregarAlCarrito(producto) {
    setCarrito((actual) => [...actual, producto]);
  }

  function irA(nuevaVista) {
    setVista(nuevaVista);
    setProductoSeleccionado(null);
    window.scrollTo(0, 0);
  }

  function verDetalle(producto) {
    setVista("productos");
    setProductoSeleccionado(producto);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <Navbar cantidad={carrito.length} vista={vista} onNavegar={irA} />

      <main>
        {vista === "inicio" && (
          <Home
            productos={productos}
            cargando={cargando}
            error={error}
            onNavegar={irA}
            onAgregar={agregarAlCarrito}
            onVerDetalle={verDetalle}
          />
        )}

        {vista === "productos" &&
          (productoSeleccionado ? (
            <ProductDetail
              producto={productoSeleccionado}
              onAgregar={agregarAlCarrito}
              onVolver={() => setProductoSeleccionado(null)}
            />
          ) : (
            <ProductList
              productos={productos}
              cargando={cargando}
              error={error}
              onAgregar={agregarAlCarrito}
              onVerDetalle={verDetalle}
            />
          ))}

        {vista === "contacto" && <ContactForm />}
      </main>

      <Footer />
    </>
  );
}

export default App;
