// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/sirnak-logo-square.png';


export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  const handle = e => {
    e.preventDefault();
    if (!u.trim() || !p) return setErr('Lütfen tüm alanları doldurun.');
    register(u.trim(), p);
    nav('/');
  };

  return (
    <div style={{ maxWidth: 360, margin: '4rem auto', padding: '0 1rem' }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={logo}
          alt="Şırnak Üniversitesi"
          style={{ maxWidth: '250px', width: '100%', height: 'auto' }}
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handle}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={u}
          onChange={e => setU(e.target.value)}
          required
          style={{ padding: '0.75rem', fontSize: '1rem', borderRadius: 4, border: '1px solid #ccc' }}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={p}
          onChange={e => setP(e.target.value)}
          required
          style={{ padding: '0.75rem', fontSize: '1rem', borderRadius: 4, border: '1px solid #ccc' }}
        />
        {err && <p style={{ color: 'red', margin: 0 }}>{err}</p>}
        <button
          type="submit"
          style={{
            padding: '0.75rem',
            fontSize: '1rem',
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Kayıt Ol
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Hesabınız var mı?{' '}
        <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>
          Giriş Yap
        </Link>
      </p>
    </div>
  );
}
