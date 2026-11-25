import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Registro() {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [registrando, setRegistrando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setRegistrando(true);

    try {
      await registrar(nombre.trim(), email.trim(), password);
      navigate('/perfil', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setRegistrando(false);
    }
  }

  return (
    <section className="seccion seccion--login">
      <form className="formulario" onSubmit={handleSubmit}>
        <h1 className="formulario__titulo">Crear cuenta</h1>

        <label className="formulario__campo">
          Nombre
          <input
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />
        </label>

        <label className="formulario__campo">
          Email
          <input
            type="email"
            autoComplete="email"
            placeholder="ejemplo@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="formulario__campo">
          Contraseña
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Elegí una contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error && <p className="error" role="alert">{error}</p>}

        <button className="formulario__boton" type="submit" disabled={registrando}>
          {registrando ? 'Creando cuenta…' : 'Registrarme'}
        </button>

        <p className="formulario__enlace">
          ¿Ya tenés cuenta? <Link to="/login">Ingresá</Link>
        </p>
      </form>
    </section>
  );
}
