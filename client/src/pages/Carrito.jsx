import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

const moneda = (valor) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(valor);

export default function Carrito() {
  const { items, total, removeItem, setQuantity, clearCart } = useCart();
  const { usuario, token } = useAuth();
  const [procesando, setProcesando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  async function finalizarCompra() {
    setError("");
    setMensaje("");
    setProcesando(true);
    try {
      const respuesta = await fetch(`${API_URL}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ items: items.map(({ producto, cantidad }) => ({ producto: producto._id, cantidad })) }),
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.error || datos.mensaje || "No se pudo finalizar la compra");
      clearCart();
      setMensaje(`¡Gracias ${usuario?.nombre || ""} por tu compra!`);
    } catch (err) {
      setError(err.message);
    } finally {
      setProcesando(false);
    }
  }

  return (
    <section className="seccion">
      <div className="contenedor carrito">
        <h1>Tu carrito</h1>
        {mensaje && <p className="carrito__mensaje" role="status">{mensaje}</p>}
        {error && <p className="error" role="alert">{error}</p>}
        {items.length === 0 ? <>
          {!mensaje && <p>Tu carrito está vacío.</p>}
          <Link className="boton boton--primario" to="/productos">Ver Catálogo</Link>
        </> : <>
          <ul className="carrito__lista">
            {items.map(({ producto, cantidad }) => <li className="carrito__item" key={producto._id}>
              <div><h2>{producto.nombre}</h2><p>{moneda(producto.precio)} c/u</p></div>
              <label>Cantidad <input type="number" min="1" value={cantidad} onChange={(e) => setQuantity(producto._id, Number(e.target.value))} /></label>
              <strong>{moneda(Number(producto.precio) * cantidad)}</strong>
              <button className="boton boton--eliminar" onClick={() => removeItem(producto._id)}>Quitar</button>
            </li>)}
          </ul>
          <p className="carrito__total">Total: {moneda(total)}</p>
          {usuario ? <button className="boton boton--primario" onClick={finalizarCompra} disabled={procesando}>{procesando ? "Procesando…" : "Finalizar Compra"}</button>
            : <p>Para finalizar tu compra, <Link className="carrito__enlace-login" to="/login" state={{ desde: "/carrito" }}>iniciá sesión</Link>.</p>}
        </>}
      </div>
    </section>
  );
}
