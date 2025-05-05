import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const nav = useNavigate();
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  const handle = async e => {
    e.preventDefault();
    const users = await (await fetch('/users.json')).json();
    const found = users.find(x => x.username === u && x.password === p);
    if (!found) return setErr('Hatalı bilgiler');

    localStorage.setItem('role', found.role);
    nav('/');
  };

  return (
    <form onSubmit={handle} style={{ padding: 16 }}>
      <h2>Giriş Yap</h2>
      <input placeholder="Kullanıcı" value={u} onChange={e=>setU(e.target.value)} /><br/>
      <input placeholder="Şifre" type="password" value={p} onChange={e=>setP(e.target.value)} /><br/>
      {err && <p style={{color:'red'}}>{err}</p>}
      <button>Giriş</button>
    </form>
  );
}
