import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar({ cantidad }) {
  const location = useLocation();
  const { usuario, logout } = useAuth();

  const enlaces = [
    { ruta: "/", texto: "Inicio" },
    { ruta: "/productos", texto: "Productos" },
    { ruta: "/contacto", texto: "Contacto" },
  ];

  return (
    <header className="encabezado">
      <div className="contenedor nav">

        <Link to="/" className="nav__marca">
          <img src="/img/logo.svg" alt="" className="nav__logo" />
          Hermanos <span>Jota</span>
        </Link>

        <input
          className="nav__checkbox"
          type="checkbox"
          id="menu-toggle"
        />

        <label className="nav__toggle" htmlFor="menu-toggle">
          <span aria-hidden="true">☰</span>
        </label>

        <ul className="nav__menu" id="menu">
          {enlaces.map((enlace) => (
            <li key={enlace.ruta}>
              <Link
                to={enlace.ruta}
                aria-current={
                  location.pathname === enlace.ruta ? "page" : undefined
                }
              >
                {enlace.texto}
              </Link>
            </li>
          ))}

          {usuario?.rol === "admin" && (
            <li>
              <Link to="/admin/crear-producto"
              aria-current={
                location.pathname === "/admin/crear-producto" ? "page" : undefined
              }
              >
                Nuevo producto
              </Link>
            </li>
          )}
        </ul>

        <span className="boton-carrito">
          Carrito (<span id="contador-carrito">{cantidad}</span>)
        </span>

        <div className="nav-usuario">
          {usuario ? (
            <>
              <Link
                to="/perfil"
              >
                Mi perfil
              </Link>
              
              <button
                className="boton boton--primario"
                onClick={logout}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/registro">Registrarme</Link>
              <Link to="/login">Ingresar</Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}

export default Navbar;
