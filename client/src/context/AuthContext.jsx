import { createContext, useCallback, useContext, useState } from 'react';
import { API_URL } from '../api.js';

const AuthContext = createContext(null);

async function leerRespuesta(respuesta) {
  const texto = await respuesta.text();
  if (!texto) return {};

  try {
    return JSON.parse(texto);
  } catch {
    return {};
  }
}

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => JSON.parse(localStorage.getItem('sesion')));

  async function login(email, password) {
    const respuesta = await fetch(`${API_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const datos = await leerRespuesta(respuesta);
    if (!respuesta.ok) throw new Error(datos.mensaje || 'No se pudo iniciar sesión');
    localStorage.setItem('sesion', JSON.stringify(datos));
    setSesion(datos);
  }

  async function registrar(nombre, email, password) {
    const respuesta = await fetch(`${API_URL}/usuarios/registro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password }),
    });
    const datos = await leerRespuesta(respuesta);

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || datos.error || 'No se pudo crear la cuenta');
    }

    await login(email, password);
  }

  const logout = useCallback(() => {
    localStorage.removeItem('sesion');
    setSesion(null);
  }, []);

  const valor = {
    usuario: sesion ? sesion.usuario : null,
    token: sesion ? sesion.token : null,
    login,
    registrar,
    logout,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
