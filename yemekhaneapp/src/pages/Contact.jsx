// src/pages/Contact.jsx
import React, { useState, useRef, useEffect } from 'react';

export default function Contact() {
  const [msg, setMsg] = useState('');
  const msgRef = useRef(null);

  // Mesaj textarea’sını içeriğe göre auto‐resize et
  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.style.height = 'auto';
      msgRef.current.style.height = `${msgRef.current.scrollHeight}px`;
    }
  }, [msg]);

  const handleSubmit = e => {
    e.preventDefault();
    // mailto ile e-posta aç
    window.location.href =
      `mailto:destek@shuniv.edu.tr` +
      `?subject=${encodeURIComponent('Yemekhane Uygulaması Mesaj')}` +
      `&body=${encodeURIComponent(msg)}`;
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>İletişim</h1>
      <p>
        Her türlü öneri, soru veya şikayet için aşağıdaki formu doldurabilir
        veya doğrudan e-posta atabilirsiniz.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <textarea
          ref={msgRef}
          className="feedback-textarea"
          placeholder="Mesajınızı yazın..."
          value={msg}
          onChange={e => setMsg(e.target.value)}
        />
        <button
          type="submit"
          style={{
            width: 'fit-content',
            padding: '0.75rem 1.5rem',
            background: 'rgb(var(--primary))',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          E-posta Gönder
        </button>
      </form>

      <p style={{ marginTop: 24 }}>
        Veya doğrudan:&nbsp;
        <a href="mailto:destek@shuniv.edu.tr">destek@shuniv.edu.tr</a>
      </p>
    </div>
  );
}
