import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { API_URL } from '../api.js';

export default function Perfil() {
  const { token, logout } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    async function cargarPerfil() {
      try {
        const respuesta = await fetch(`${API_URL}/usuarios/perfil`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const texto = await respuesta.text();
        let datos = {};

        try {
          datos = texto ? JSON.parse(texto) : {};
        } catch {
          datos = {};
        }

        if (respuesta.status === 401) {
          logout();
          return;
        }

        if (!respuesta.ok) {
          throw new Error(datos.mensaje || datos.error || 'No se pudo cargar el perfil');
        }

        if (activo) setPerfil(datos);
      } catch (err) {
        if (activo) setError(err.message);
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarPerfil();
    return () => { activo = false; };
  }, [token, logout]);

  if (cargando) {
    return <section className="seccion"><p className="estado-carga">Cargando perfil…</p></section>;
  }

  if (error) {
    return <section className="seccion"><p className="error" role="alert">{error}</p></section>;
  }

  if (!perfil) return null;

  return (
    <section className="seccion seccion--perfil">
      <div className="perfil">
        <h1 className="seccion__titulo">Mi perfil</h1>
        <dl className="perfil__datos">
          <div><dt>Nombre</dt><dd>{perfil.nombre}</dd></div>
          <div><dt>Email</dt><dd>{perfil.email}</dd></div>
          <div><dt>Rol</dt><dd>{perfil.rol}</dd></div>
        </dl>
      </div>
    </section>
  );
}
