// src/pages/MonthlyMenu.jsx
import { useEffect, useState } from 'react';

export default function MonthlyMenu() {
  const [menus, setMenus]     = useState([]);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/menu-2025-05.json')
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed');
        return res.json();
      })
      .then(data => setMenus(data))
      .catch(() => setError('Aylık menü yüklenemedi.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding:16 }}>Yükleniyor…</div>;
  if (error)   return <div style={{ padding:16, color:'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth:600, margin:'0 auto', padding:16 }}>
      <h1 style={{ marginBottom:12 }}>2025 Mayıs Aylık Menü</h1>
      <ul style={{ listStyle:'none', padding:0 }}>
        {menus.map(m => (
          <li key={m.date} style={{ marginBottom:16 }}>
            <h2 style={{ margin:0 }}>{m.date}</h2>
            <ul style={{ margin:'4px 0 0 16px' }}>
              {m.items.map(item => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
