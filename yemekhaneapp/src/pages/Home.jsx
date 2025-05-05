import { useEffect, useState } from 'react';

export default function Home() {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    fetch('/menu-today.json')
      .then(r => r.json())
      .then(setMenu);
  }, []);

  if (!menu) return <p>Yükleniyor…</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>{menu.date} Menüsü</h2>
      <ul>
        {menu.items.map(x => <li key={x}>{x}</li>)}
      </ul>
      <p>Toplam kalori: {menu.calories}</p>
    </div>
  );
}
