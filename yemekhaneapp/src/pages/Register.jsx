// src/pages/Register.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  const handle = e => {
    e.preventDefault();
    if (!u || !p) return setErr('Lütfen tüm alanları doldur.');
    const ok = register(u.trim(), p);
    if (!ok) return setErr('Kayıt başarısız.');
    nav('/');  // kayıt sonrası ana sayfaya
  };

  return (
    <form onSubmit={handle} style={{ padding:16 }}>
      <h2>Kayıt Ol</h2>
      <input
        placeholder="Kullanıcı Adı"
        value={u}
        onChange={e => setU(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="Şifre"
        value={p}
        onChange={e => setP(e.target.value)}
      /><br/>
      {err && <p style={{color:'red'}}>{err}</p>}
      <button>Kayıt Ol</button>
      <p style={{ marginTop:8 }}>
        Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
      </p>
    </form>
  );
}
