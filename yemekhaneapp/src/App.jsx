import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home  from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
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
        {!user && (
          <>
            <Link to="/login" style={{color:'#fff', marginRight:12}}>Giriş</Link>
            <Link to="/register" style={{color:'#fff'}}>Kayıt Ol</Link>
          </>
        )}
        {user && <button onClick={logout}>Çıkış</button>}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute allowed={['admin']} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </div>
  );
}
