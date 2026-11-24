import { createContext, useContext, useState } from 'react';
import { API_URL } from '../api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // La sesión es lo que devuelve el login: { token, usuario }. Sin sesión: null.
  const [sesion, setSesion] = useState(() => JSON.parse(localStorage.getItem('sesion')));

  async function login(email, password) {
    const respuesta = await fetch(`${API_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const datos = await respuesta.json();
    if (!respuesta.ok) throw new Error(datos.mensaje || 'No se pudo iniciar sesión');
    localStorage.setItem('sesion', JSON.stringify(datos));
    setSesion(datos);
  }

  function logout() {
    localStorage.removeItem('sesion');
    setSesion(null);
  }

  const valor = {
    usuario: sesion ? sesion.usuario : null,
    token: sesion ? sesion.token : null,
    login,
    logout,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}