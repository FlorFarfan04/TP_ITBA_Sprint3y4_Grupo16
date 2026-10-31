import { Link, useLocation } from "react-router-dom";

function Navbar({ cantidad }) {

  const location = useLocation();

  const enlaces = [
    { ruta: "/", texto: "Inicio" },
    { ruta: "/productos", texto: "Productos" },
    { ruta: "/contacto", texto: "Contacto" },
    { ruta: "/admin/crear-producto", texto: "Nuevo producto" }
  ];

  return (
    <header className="encabezado">
      <div className="contenedor nav">

        <Link to="/" className="nav__marca">
          <img src="/img/logo.svg" alt="" className="nav__logo" />
          Hermanos <span>Jota</span>
        </Link>

        <input className="nav__checkbox" type="checkbox" id="menu-toggle" />

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
        </ul>

        <span className="boton-carrito">
          Carrito (<span id="contador-carrito">{cantidad}</span>)
        </span>

      </div>
    </header>
  );
}

export default Navbar;
