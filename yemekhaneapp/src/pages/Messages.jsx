import { useEffect, useState } from 'react';

export default function Messages() {
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    // Örnek: localStorage'da tutulan tüm mesajları çekin
    const all = JSON.parse(localStorage.getItem('studentMessages') || '[]');
    setMsgs(all);
  }, []);

  return (
    <div style={{ padding:16 }}>
      <h1>Öğrenci Mesajları</h1>
      {msgs.length === 0 && <p>Henüz mesaj yok.</p>}
      <ul>
        {msgs.map((m, i) => (
          <li key={i} style={{ marginBottom:8, borderBottom:'1px solid #ddd', paddingBottom:4 }}>
            <strong>{m.student}</strong>: {m.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
