/* src/App.jsx */
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home  from './pages/Home';
import Login from './pages/Login';

export default function App() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div>
      {/* Basit üst menü */}
      <nav style={{ padding: '8px 16px', background: '#1976d2', color: '#fff' }}>
        <Link to="/"     style={{ color:'#fff', marginRight:12 }}>Ana Sayfa</Link>
        {!role && <Link to="/login" style={{ color:'#fff' }}>Giriş</Link>}
        {role && <button onClick={handleLogout} style={{ marginLeft:12 }}>Çıkış</button>}
      </nav>

      {/* Rotalar */}
      <Routes>
        <Route path="/"      element={<Home />}   />
        <Route path="/login" element={<Login />}  />
        {/* Diğer sayfalar ileride eklenecek */}
      </Routes>
    </div>
  );
}
