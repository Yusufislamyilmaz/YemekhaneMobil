// src/pages/Home.jsx
import { useEffect, useState } from 'react';

export default function Home() {
  const [menu, setMenu]     = useState(null);
  const [error, setError]   = useState('');
  const [loading, setLoad]  = useState(true);

  useEffect(() => {
    fetch('/menu-today.json')
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then(data => setMenu(data))
      .catch(() => setError('Menü yüklenirken bir hata oluştu.'))
      .finally(() => setLoad(false));
  }, []);

  if (loading) return <div style={{ padding:16 }}>Yükleniyor…</div>;
  if (error)   return <div style={{ padding:16, color:'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 600, margin:'0 auto', padding:16 }}>
      <h1 style={{ marginBottom: 12 }}>
        {menu.date} Tarihli Menümüz
      </h1>
      <ul style={{ listStyle:'none', padding:0 }}>
        {menu.items.map(item => (
          <li
            key={item}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius:4,
              marginBottom:8,
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      {menu.calories != null && (
        <p style={{ marginTop:12, fontStyle:'italic' }}>
          Toplam kalori: <strong>{menu.calories}</strong>
        </p>
      )}
    </div>
  );
}
