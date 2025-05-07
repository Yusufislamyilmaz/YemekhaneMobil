// src/pages/CardInfo.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function CardInfo() {
  const { user } = useAuth();
  const [cardInfo, setCardInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetch('/users.json')
      .then(res => {
        if (!res.ok) throw new Error('users.json yüklenemedi');
        return res.json();
      })
      .then(users => {
        const me = users.find(u => u.username === user.username);
        if (!me) {
          setCardInfo(null);
        } else {
          const saved = localStorage.getItem(`balance-${me.username}`);
          setCardInfo({
            cardNumber: me.cardNumber,
            balance: saved !== null ? Number(saved) : me.balance,
          });
        }
      })
      .catch(() => setCardInfo(null))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <div className="card-loading">Yükleniyor…</div>;
  }
  if (!user) {
    return <div className="card-unauth">Kart bilgilerine erişmek için giriş yapın.</div>;
  }
  if (!cardInfo || !cardInfo.cardNumber) {
    return <div className="card-notfound">Kart bilgisi bulunamadı.</div>;
  }

  const handleLoad = () => {
    const v = parseFloat(amount);
    if (isNaN(v) || v <= 0) {
      alert('Lütfen geçerli bir miktar girin.');
      return;
    }
    const newBal = cardInfo.balance + v;
    localStorage.setItem(`balance-${user.username}`, newBal);
    setCardInfo(ci => ({ ...ci, balance: newBal }));
    setAmount('');
  };

  return (
    <div className="card-container">
      <h1 className="card-title">Kart Bilgileri</h1>
      <div className="card-info-box">
        <p className="card-info-item">
          <strong className="card-info-label">Öğrenci No:</strong> {user.username}
        </p>
        <p className="card-info-item">
          <strong className="card-info-label">Kart No:</strong> {cardInfo.cardNumber}
        </p>
        <p className="card-info-item">
          <strong className="card-info-label">Bakiye:</strong> {cardInfo.balance.toFixed(2)} ₺
        </p>

        <label className="card-load-label">
          <strong className="card-info-label">Yükleme Miktarı (₺):</strong>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="örn. 50"
            className="card-load-input"
          />
        </label>

        <button onClick={handleLoad} className="card-load-button">
          Yükle
        </button>
      </div>
    </div>
  );
}
