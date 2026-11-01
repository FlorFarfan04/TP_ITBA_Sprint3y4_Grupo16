import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ContactForm from "./components/ContactForm";
import ProductoForm from "./components/ProductoForm";

import Catalogo from "./pages/Catalogo";

const API = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, "")}/api/productos`
  : "/api/productos";

function DetalleProducto({ onAgregar, onEliminar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(true);
  const [errorDetalle, setErrorDetalle] = useState(null);

  useEffect(() => {
    async function cargarProducto() {
      try {
        setCargandoDetalle(true);
        setErrorDetalle(null);

        const respuesta = await fetch(`${API_URL}/${id}`);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(datos.error || "No se pudo cargar el producto");
        }

        setProducto(datos);
      } catch (error) {
        setErrorDetalle(error.message);
      } finally {
        setCargandoDetalle(false);
      }
    }

    cargarProducto();
  }, [id]);

  if (cargandoDetalle) {
    return <p>Cargando producto...</p>;
  }

  if (errorDetalle) {
    return <p className="error">{errorDetalle}</p>;
  }

  if (!producto) {
    return <p>No encontramos el producto solicitado.</p>;
  }

  return (
    <ProductDetail
    producto={producto}
    onAgregar={onAgregar}
    onEliminar={onEliminar}
    onVolver={() => navigate("/productos")}
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

  function actualizarProductos(productoGuardado) {
  setProductos((actuales) => {
    const existe = actuales.some(
      (producto) => producto._id === productoGuardado._id
    );

    if (existe) {
      // Si ya existía, reemplazamos sus datos.
      return actuales.map((producto) =>
        producto._id === productoGuardado._id
          ? productoGuardado
          : producto
      );
    }

    return [...actuales, productoGuardado];
  });
}

async function eliminarProducto(id) {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo eliminar el producto");
    }

    setProductos((actuales) =>
      actuales.filter((producto) => producto._id !== id)
    );

    navigate("/productos");

  } catch (error) {
    console.error("Error al eliminar:", error);
    alert("Ocurrió un error al eliminar el producto.");
  }
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
              onAgregar={agregarAlCarrito}
              onEliminar={eliminarProducto}
              />
            }
          />

          <Route
            path="/contacto"
            element={<ContactForm />}
          />

          <Route
          path="/admin/crear-producto"
          element={<ProductoForm onGuardado={actualizarProductos} />}
          />

          <Route
          path="/admin/editar-producto/:id"
          element={<ProductoForm onGuardado={actualizarProductos} />}
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


