

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";
import NuevoProductoForm from "./components/NuevoProductoForm";

import Catalogo from "./pages/Catalogo";

const API_URL = "/api/productos";

function DetalleProducto({ productos, onAgregar, cargando }) {

  const { id } = useParams();

  const producto = productos.find(
    (producto) => producto._id === id || producto.id === id
  );

  if (cargando) {
    return <p>Cargando producto...</p>;
  }

  if (!producto) {
    return <p>No encontramos el producto solicitado.</p>;
  }

  return (
    <ProductDetail
      producto={producto}
      onAgregar={onAgregar}
      onVolver={() => window.history.back()}
    />
  );
}

function App() {

  const navigate = useNavigate();

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

    const rutas = {
      inicio: "/",
      productos: "/productos",
      contacto: "/contacto"
    };

    navigate(rutas[nuevaVista]);
    window.scrollTo(0, 0);
  }

  function sumarProducto(nuevo) {
    setProductos((actuales) => [...actuales, nuevo]);
  }

  return (
    <>
      <Navbar cantidad={carrito.length} />

      <main>

        <Routes>

          <Route
            path="/"
            element={
              <Home
                productos={productos}
                cargando={cargando}
                error={error}
                onNavegar={irA}
                onAgregar={agregarAlCarrito}
                onVerDetalle={(producto) =>
                  navigate(`/productos/${producto._id || producto.id}`)
                }
              />
            }
          />

          <Route
            path="/productos"
            element={
              <Catalogo
                productos={productos}
                cargando={cargando}
                error={error}
                onAgregar={agregarAlCarrito}
                onVerDetalle={(producto) =>
                  navigate(`/productos/${producto._id || producto.id}`)
                }
              />
            }
          />

          <Route
            path="/productos/:id"
            element={
              <DetalleProducto
                productos={productos}
                cargando={cargando}
                onAgregar={agregarAlCarrito}
              />
            }
          />

          <Route
            path="/contacto"
            element={<ContactForm />}
          />

          <Route
            path="/admin/crear-producto"
            element={
              <NuevoProductoForm
                onCreado={(nuevo) => {
                  sumarProducto(nuevo);
                  navigate("/productos");
                }}
              />
            }
          />

          <Route
            path="*"
            element={<h2>Página no encontrada (404)</h2>}
          />

        </Routes>

      </main>

      <Footer />
    </>
  );
}

export default App;


