// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Home           from './pages/Home';
import Login          from './pages/Login';
import Register       from './pages/Register';
import PrivateRoute   from './components/PrivateRoute';
import { useAuth }    from './contexts/AuthContext';
import MonthlyMenu    from './pages/MonthlyMenu';
import AdminPanel     from './pages/AdminPanel';
import Contact        from './pages/Contact';
import './index.css';


export default function App() {
  const nav   = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 500,
    padding: '0.5rem 0',
  };
  const logoutStyle = {
    background: 'transparent',
    border: '1px solid #fff',
    color: '#fff',
    padding: '0.25rem 0.75rem',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 500,
  };

  return (
    <div>
      <nav className="navbar" style={{ background: '#1976d2', padding: '0.75rem 1.5rem' }}>
        {/* Logo / Başlık */}
        <Link to="/" style={{ color: '#fff', fontWeight: 600, textDecoration: 'none' }}>
          YemekApp
        </Link>

        {/* Hamburger butonu (mobil) */}
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen
            ? <XMarkIcon style={{ width: 24, height: 24, color: '#fff' }} />
            : <Bars3Icon  style={{ width: 24, height: 24, color: '#fff' }} />
          }
        </button>
        
        {/* Linkler */}
        <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
          <Link to="/"      style={linkStyle}>Ana Sayfa</Link>
          <Link to="/aylik" style={linkStyle}>Aylık Menü</Link>
          {!user ? (
            <>
              <Link to="/login"    style={linkStyle}>Giriş</Link>
              <Link to="/register" style={linkStyle}>Kayıt Ol</Link>
            </>
          ) : (
            <button onClick={logout} style={logoutStyle}>Çıkış</button>
          )}
          <Link to="/contact" style={linkStyle}>İletişim</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/"      element={<Home />}         />
        <Route path="/aylik" element={<MonthlyMenu />}  />
        <Route path="/login" element={<Login />}        />
        <Route path="/register" element={<Register />}  />
        <Route element={<PrivateRoute allowed={['admin']} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
        <Route path="/contact" element={<Contact />}    />
      </Routes>
    </div>
  );
}
