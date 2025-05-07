import React, { useEffect, useState } from 'react';

export default function MonthlyMenu() {
  const [menus, setMenus]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    const now  = new Date();
    const yyyy = now.getFullYear();
    const mm   = String(now.getMonth() + 1).padStart(2, '0');
    const file = `/menu-${yyyy}-${mm}.json`;

    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`Dosya bulunamadı: ${file}`);
        return res.json();
      })
      .then(data => setMenus(data))
      .catch(() => setError('Aylık menü yüklenirken bir hata oluştu.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="monthly-loading">Yükleniyor…</div>;
  if (error)   return <div className="monthly-error">{error}</div>;

  return (
    <div className="monthly-container">
      <h1 className="monthly-title">Aylık Menü</h1>
      <div className="monthly-grid">
        {menus.map(day => (
          <div key={day.date} className="day-card">
            <div className="day-date">{day.date}</div>
            <ul>
              {day.items.map(item => (
                <li key={item} className="day-item">{item}</li>
              ))}
            </ul>
            {typeof day.calories === 'number' && (
              <p className="day-calories">
                Toplam Kalori: <strong>{day.calories}</strong>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
