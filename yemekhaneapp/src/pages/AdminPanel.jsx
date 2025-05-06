// src/pages/AdminPanel.jsx
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [date, setDate] = useState('');
  const [items, setItems] = useState(['', '', '', '']);
  const [calories, setCalories] = useState('');
  const [saved, setSaved] = useState(false);

  // Yüklü ayarları getir
  useEffect(() => {
    const json = localStorage.getItem('adminMenu-today');
    if (json) {
      const { date, items, calories } = JSON.parse(json);
      setDate(date);
      setItems(items);
      setCalories(calories);
    }
  }, []);

  // Item input handler
  const handleItemChange = (idx, val) => {
    const copy = [...items];
    copy[idx] = val;
    setItems(copy);
  };

  // Kaydet butonu
  const save = () => {
    const obj = { date, items, calories: Number(calories) };
    localStorage.setItem('adminMenu-today', JSON.stringify(obj));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <h1>Admin Panel – Günün Menüsü</h1>
      <label>
        Tarih:{' '}
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </label>

      {items.map((it, i) => (
        <input
          key={i}
          placeholder={`Yemek ${i + 1}`}
          value={it}
          onChange={e => handleItemChange(i, e.target.value)}
          style={{
            display: 'block',
            width: '100%',
            marginTop: 8,
            padding: 8,
            fontSize: 14,
          }}
        />
      ))}

      <label style={{ display:'block', marginTop:8 }}>
        Kalori:{' '}
        <input
          type="number"
          value={calories}
          onChange={e => setCalories(e.target.value)}
          style={{ width: '100px' }}
        />
      </label>

      <button
        onClick={save}
        style={{
          marginTop: 12,
          padding: '8px 16px',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Kaydet
      </button>

      {saved && <p style={{ color: 'green', marginTop: 8 }}>Kaydedildi!</p>}
    </div>
  );
}
