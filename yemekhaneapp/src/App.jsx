import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home  from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './contexts/AuthContext';
import MonthlyMenu from './pages/MonthlyMenu'; //  #7 - Aylık Menü
import AdminPanel from './pages/AdminPanel'; //  #9 - Admin Paneli
import Contact from './pages/Contact'; //  #10 - İletişim



export default function App() {
  const nav   = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.75rem 1.5rem',
          background: '#1976d2',
          color: '#fff',
        }}
      >
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
          Ana Sayfa
        </Link>
        <Link to="/aylik" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
          Aylık Menü
        </Link>
        {!user ? (
          <>
            <Link to="/login"    style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
              Giriş
            </Link>
            <Link to="/register" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
              Kayıt Ol
            </Link>
            <Link to="/contact"  style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
              İletişim
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            style={{
              background: 'transparent',
              border: '1px solid #fff',
              color: '#fff',
              padding: '0.25rem 0.75rem',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Çıkış
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/"      element={<Home />}    />
        <Route path="/aylik" element={<MonthlyMenu />} />
        <Route path="/login" element={<Login />}   />
        <Route path="/register" element={<Register />} />
        {/* Admin Panel */}
        <Route element={<PrivateRoute allowed={['admin']} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </div>
  );
}
