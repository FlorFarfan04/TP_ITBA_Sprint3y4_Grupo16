import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate(location.state?.desde || '/', { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="seccion seccion--login">
      <form onSubmit={handleSubmit} className="formulario">
        <h1 className="formulario__titulo">Ingresar</h1>
        <label className="formulario__campo">Email
          <input type="email" placeholder="ejemplo@email.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="formulario__campo">Contraseña
          <input type="password" placeholder="Ingresá tu contraseña" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="formulario__boton" type="submit">Ingresar</button>
        <p className="formulario__enlace">
          ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
        </p>
      </form>
    </section>
  );
}
