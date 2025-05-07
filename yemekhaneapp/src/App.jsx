// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from './contexts/AuthContext';
import Home         from './pages/Home';
import MonthlyMenu  from './pages/MonthlyMenu';
import Login        from './pages/Login';
import Register     from './pages/Register';
import AdminPanel   from './pages/AdminPanel';
import Contact      from './pages/Contact';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import smallLogo from './assets/sirnak-logo-square.png';
import BottomNav from './components/BottomNav';
import Profile from './pages/Profile';
import Location     from './pages/Location';
import Messages   from './pages/Messages';
import CardInfo   from './pages/CardInfo';


export default function App() {
  const navigate = useNavigate();
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
    <div  className="content-wrapper">               {/* ← sınıfı ekledik */}
      {/* Navbar yalnızca kullanıcı girişliyse gözükür */}
      {user && (
        <nav
          className="navbar"
          style={{
            background: 'rgb(var(--primary))',
            display: 'flex',
            alignItems: 'center',         // dikey ortala
            justifyContent: 'space-between',
            padding: '0.5rem 0.5rem',    // üst-alt padding artırıldı
            leftmargin: '1rem 1rem'          // sağdan soldan 1rem boşluk
            // dilerseniz kesin yükseklik isterseniz:
            // minHeight: '64px',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              marginTop: '10px'      /* ↓ aşağı kaydır */
            }}
          >
            <img
              src={smallLogo}
              alt="Şırnak Üniversitesi"
              style={{ width: 24, height: 24 }}
            />
            <span style={{ color: '#fff', fontWeight: 600 }}>
              Şırnak Üniversitesi Yemekhane
            </span>
          </Link>
          
          {/* Hamburger butonu */}
          <button
            className="navbar-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              
              marginTop: '10px'      /* ↓ aşağı kaydır */
            }}
          >
            {menuOpen
              ? <XMarkIcon style={{ width: 24, height: 24, color: '#b58d36' }} />
              : <Bars3Icon style={{ width: 24, height: 24, color: '#b58d36' }} />
            }
          </button>
          
          {/* Sadece İletişim, Profil ve Çıkış */}
          <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
            {user.role === 'student' && (
              <Link
                to="/contact"
                style={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                İletişim
              </Link>
            )}
            {user.role === 'admin' && (
              <Link
                to="/admin"
                style={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                Admin Panel
              </Link>
            )}
            <Link
              to="/profile"
              style={linkStyle}
              onClick={() => setMenuOpen(false)}
            >
              Profil
            </Link>
            <button
              onClick={() => { setMenuOpen(false); logout(); }}
              style={logoutStyle}
            >
              Çıkış
            </button>
          </div>
        </nav>
      )}


      <Routes>
        {/* Giriş gerekli olmayan sayfalar */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Girişli kullanıcılar için korumalı rotalar */}
        <Route element={<PrivateRoute />}>
          <Route path="/"      element={<Home />} />
          <Route path="/aylik" element={<MonthlyMenu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/location" element={<Location />}   />
          <Route path="/card-info" element={<CardInfo />}   />
          <Route path="/messages"  element={<Messages />}    />
        </Route>

        {/* Sadece admin erişimi */}
        <Route element={<PrivateRoute allowed={['admin']} />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Tanımsız rotalar → login ya da ana sayfaya */}
        <Route
          path="*"
          element={
            user
              ? <Navigate to="/" replace />
              : <Navigate to="/login" replace />
          }
        />

      </Routes>

      {/* BottomNav: sadece girişli kullanıcılar için */}
      {user && <BottomNav />}
    </div>
  );
}
