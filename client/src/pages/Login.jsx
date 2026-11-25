import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    <section>
      <h1>Ingresar</h1>
      <form onSubmit={handleSubmit} className="formulario-login">
        <label>Email <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Contraseña <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
}