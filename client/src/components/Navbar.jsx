function Navbar({ vista, onNavegar, cantidad }) {
  
  const activa = vista === "detalle" ? "productos" : vista;

  const enlaces = [
    { clave: "inicio", texto: "Inicio" },
    { clave: "productos", texto: "Productos" },
    { clave: "contacto", texto: "Contacto" },
  ];

  return (
    <header className="encabezado">
      <div className="contenedor nav">
        <a
          href="#"
          className="nav__marca"
          onClick={(e) => {
            e.preventDefault();
            onNavegar("inicio");
          }}
        >
          <img src="/img/logo.svg" alt="" className="nav__logo" />
          Hermanos <span>Jota</span>
        </a>

        <input className="nav__checkbox" type="checkbox" id="menu-toggle" />
        <label className="nav__toggle" htmlFor="menu-toggle">
          <span aria-hidden="true">☰</span>
        </label>

        <ul className="nav__menu" id="menu">
          {enlaces.map((enlace) => (
            <li key={enlace.clave}>
              <a
                href="#"
                aria-current={activa === enlace.clave ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onNavegar(enlace.clave);
                }}
              >
                {enlace.texto}
              </a>
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
