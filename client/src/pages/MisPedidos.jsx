import { useEffect, useState } from "react";
import { API_URL } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";

const moneda = (valor) => new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
}).format(valor);

export default function MisPedidos() {
  const { token } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarPedidos() {
      try {
        const respuesta = await fetch(`${API_URL}/pedidos`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        const datos = await respuesta.json();
        if (!respuesta.ok) throw new Error(datos.error || datos.mensaje || "No se pudieron cargar tus pedidos");
        setPedidos(datos);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }

    cargarPedidos();
    return () => controller.abort();
  }, [token]);

  return (
    <section className="seccion seccion--mis-pedidos">
      <div className="contenedor mis-pedidos">
        <h1 className="seccion__titulo">Mis pedidos</h1>
        {cargando && <p className="estado-carga">Cargando pedidos…</p>}
        {error && <p className="error" role="alert">{error}</p>}
        {!cargando && !error && pedidos.length === 0 && <p className="mis-pedidos__vacio">Todavía no realizaste pedidos.</p>}
        {!cargando && pedidos.length > 0 && (
          <ul className="mis-pedidos__lista">
            {pedidos.map((pedido) => (
              <li className="mis-pedidos__pedido" key={pedido._id}>
                <div className="mis-pedidos__encabezado">
                  <h2>Pedido del {new Date(pedido.createdAt).toLocaleDateString("es-AR")}</h2>
                  <strong>{moneda(pedido.total)}</strong>
                </div>
                <ul className="mis-pedidos__items">
                  {pedido.items.map((item, indice) => (
                    <li key={`${item.producto}-${indice}`}>
                      <span>{item.nombre} × {item.cantidad}</span>
                      <span>{moneda(item.precio * item.cantidad)}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
