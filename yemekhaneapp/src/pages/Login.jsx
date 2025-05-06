import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  const handle = async e => {
    e.preventDefault();
    const ok = await login(u, p);
    if (!ok) return setErr('Hatalı bilgiler');
    nav('/');
  };

  return (
    <form onSubmit={handle} style={{ padding: 16 }}>
      <h2>Giriş Yap</h2>
      <input value={u} onChange={e=>setU(e.target.value)} placeholder="Kullanıcı" />
      <br/>
      <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="Şifre" />
      <br/>
      {err && <p style={{color:'red'}}>{err}</p>}
      <button>Giriş</button>
      <p style={{ marginTop:8 }}>
        Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
      </p>
    </form>
  );
}
