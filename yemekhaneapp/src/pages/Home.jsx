// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import StarRating from '../components/StarRating';

export default function Home() {
  const [menu, setMenu]     = useState(null);
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(true);

  // ★ Feedback için state’ler ★
  const [rating, setRating]   = useState(0);
  const [comment, setComment] = useState('');

  // Menü verisini çek
  useEffect(() => {
    // Eğer admin panelden kaydedilmiş menü varsa önce onu al
    const adminJson = localStorage.getItem('adminMenu-today');
    if (adminJson) {
      try {
        setMenu(JSON.parse(adminJson));
        setLoading(false);
        return;
      } catch {}
    }

    // Aksi hâlde statik JSON’dan çek
    fetch('/menu-today.json')
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(data => setMenu(data))
      .catch(() => setError('Menü yüklenirken bir hata oluştu.'))
      .finally(() => setLoading(false));
  }, []);

  // Menü yüklendiğinde, LocalStorage’dan feedback’i çek
  useEffect(() => {
    if (!menu) return;
    const key = `rating-${menu.date}`;
    setRating(Number(localStorage.getItem(key)) || 0);
    setComment(localStorage.getItem(`${key}-comment`) || '');
  }, [menu]);

  if (loading) return <div style={{ padding: 16 }}>Yükleniyor…</div>;
  if (error)   return <div style={{ padding: 16, color: 'red' }}>{error}</div>;

  // Menü artık garanti var
  const key = `rating-${menu.date}`;
  const saveFeedback = () => {
    localStorage.setItem(key, rating);
    localStorage.setItem(`${key}-comment`, comment);
    alert('Yorum kaydedildi.');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <h1 style={{ marginBottom: 12 }}>
        {menu.date} Tarihli Menümüz
      </h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menu.items.map(item => (
          <li
            key={item}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: 4,
              marginBottom: 8,
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      {menu.calories != null && (
        <p style={{ marginTop: 12, fontStyle: 'italic' }}>
          Toplam kalori: <strong>{menu.calories}</strong>
        </p>
      )}

      {/* → Burada feedback bölümü */}
      <div style={{ marginTop: 32, borderTop: '1px solid #eee', paddingTop: 16 }}>
        <h2 style={{ marginBottom: 8 }}>Değerlendir</h2>
        <StarRating rating={rating} onChange={setRating} />
        <textarea
          placeholder="Yorumunuzu yazın"
          value={comment}
          onChange={e => setComment(e.target.value)}
          style={{
            width: '100%',
            height: 80,
            marginTop: 8,
            padding: 8,
            fontSize: 14,
            border: '1px solid #ccc',
            borderRadius: 4,
          }}
        />
        <button
          onClick={saveFeedback}
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
      </div>
    </div>
  );
}
