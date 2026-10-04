import { useState } from "react";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactForm() {
  
  const [datos, setDatos] = useState({ nombre: "", email: "", mensaje: "" });
  const [respuesta, setRespuesta] = useState({ texto: "", esError: false });

  function manejarCambio(e) {
    const { name, value } = e.target;
    setDatos((actual) => ({ ...actual, [name]: value }));
  }

  function manejarEnvio(e) {
    e.preventDefault();

    const nombre = datos.nombre.trim();
    const email = datos.email.trim();
    const mensaje = datos.mensaje.trim();

    if (nombre === "" || email === "" || mensaje === "") {
      setRespuesta({ texto: "Completá todos los campos.", esError: true });
      return;
    }

    if (!REGEX_EMAIL.test(email)) {
      setRespuesta({ texto: "Ingresá un email válido.", esError: true });
      return;
    }

    setRespuesta({
      texto: `¡Gracias, ${nombre}! Respondemos a ${email}.`,
      esError: false,
    });
    setDatos({ nombre: "", email: "", mensaje: "" });
  }

  return (
    <section className="seccion seccion--contacto">
      <div className="contacto" id="contacto">
        <h2 className="seccion__titulo">Contactanos</h2>

        <form id="form-contacto" onSubmit={manejarEnvio} noValidate>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingresá tu nombre"
              value={datos.nombre}
              onChange={manejarCambio}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@email.com"
              value={datos.email}
              onChange={manejarCambio}
            />
          </div>
          <div>
            <label htmlFor="mensaje">Mensaje:</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="6"
              placeholder="Escribí tu mensaje..."
              value={datos.mensaje}
              onChange={manejarCambio}
            ></textarea>
          </div>

          <button type="submit">Enviar</button>
          <p id="mensaje-exito" className={respuesta.esError ? "error" : ""}>
            {respuesta.texto}
          </p>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
