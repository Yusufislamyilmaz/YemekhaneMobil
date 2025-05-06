import { useState } from 'react';

export default function Contact() {
  const [msg, setMsg] = useState('');

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding:16 }}>
      <h1>İletişim</h1>
      <p>Her türlü öneri, soru veya şikayet için aşağıdaki formu doldurabilir veya doğrudan e-posta atabilirsiniz.</p>
      
      <form
        onSubmit={e => {
          e.preventDefault();
          window.location.href = `mailto:destek@shuniv.edu.tr?subject=Yemekhane Uygulaması Mesaj&body=${encodeURIComponent(msg)}`;
        }}
      >
        <textarea
          placeholder="Mesajınızı yazın..."
          value={msg}
          onChange={e => setMsg(e.target.value)}
          style={{
            width:'100%', height:120, padding:8,
            fontSize:14, border:'1px solid #ccc', borderRadius:4
          }}
        />
        <button
          type="submit"
          style={{
            marginTop:12, padding:'8px 16px',
            background:'#1976d2', color:'#fff',
            border:'none', borderRadius:4, cursor:'pointer'
          }}
        >
          E-posta Gönder
        </button>
      </form>

      <p style={{ marginTop:24 }}>
        Veya doğrudan: <a href="mailto:destek@shuniv.edu.tr">destek@shuniv.edu.tr</a>
      </p>
    </div>
  );
}
