import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home  from './pages/Home';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './contexts/AuthContext';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const nav   = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div>
      <nav style={{ padding:'8px 16px', background:'#1976d2', color:'#fff' }}>
        <Link to="/" style={{color:'#fff', marginRight:12}}>Ana Sayfa</Link>
        {!user && <Link to="/login" style={{color:'#fff'}}>Giriş</Link>}
        {user && <button onClick={logout}>Çıkış</button>}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Örneğin admin paneli: */}
        <Route element={<PrivateRoute allowed={['admin']} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </div>
  );
}
