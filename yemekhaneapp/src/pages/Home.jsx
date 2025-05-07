// src/pages/Home.jsx
import { useEffect, useState, useRef } from 'react';
import StarRating from '../components/StarRating';
import '../index.css';

export default function Home() {
  const [menu, setMenu]       = useState(null);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(true);
  const [rating, setRating]   = useState(0);
  const [comment, setComment] = useState('');
  const commentRef           = useRef(null);

  // Menü verisini çek (admin override veya statik)
  useEffect(() => {
    const adminJson = localStorage.getItem('adminMenu-today');
    if (adminJson) {
      try {
        setMenu(JSON.parse(adminJson));
        setLoading(false);
        return;
      } catch {}
    }
    fetch('/menu-today.json')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setMenu(data))
      .catch(() => setError('Menü yüklenirken bir hata oluştu.'))
      .finally(() => setLoading(false));
  }, []);

  // Menü yüklendiğinde feedback’i yükle
  useEffect(() => {
    if (!menu) return;
    const key = `rating-${menu.date}`;
    setRating(Number(localStorage.getItem(key)) || 0);
    setComment(localStorage.getItem(`${key}-comment`) || '');
  }, [menu]);

  // Textarea’yı içeriğe göre resize et
  useEffect(() => {
    if (commentRef.current) {
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
    }
  }, [comment]);

  if (loading) return <div className="home-loading">Yükleniyor…</div>;
  if (error)   return <div className="home-error">{error}</div>;

  const key = `rating-${menu.date}`;
  const saveFeedback = () => {
    localStorage.setItem(key, rating);
    localStorage.setItem(`${key}-comment`, comment);
    alert('Yorum kaydedildi.');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">{menu.date} Tarihli Menümüz</h1>

      <div className="menu-grid">
        {menu.items.map(item => (
          <div key={item} className="menu-card">
            {item}
          </div>
        ))}
      </div>

      {menu.calories != null && (
        <p className="home-calories">
          Toplam kalori: <strong>{menu.calories}</strong>
        </p>
      )}

      <section className="feedback-section">
        <h2 className="feedback-title">Değerlendir</h2>
        <StarRating rating={rating} onChange={setRating} />
        <textarea
          ref={commentRef}
          className="feedback-textarea"
          placeholder="Yorumunuzu yazın"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button className="feedback-button" onClick={saveFeedback}>
          Kaydet
        </button>
      </section>
    </div>
  );
}
