// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetch('/users.json')
      .then(res => {
        if (!res.ok) throw new Error('Cannot load users');
        return res.json();
      })
      .then(users => {
        const me = users.find(u => u.username === user.username);
        setProfile(me || null);
      })
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="profile-loading">
        Profil yükleniyor…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-unauth">
        Bu sayfayı görebilmek için lütfen giriş yapın.
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-notfound">
        Profil bulunamadı.
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profilim</h1>
      <div className="profile-card">
        <p className="profile-item">
          <strong className="profile-label">Öğrenci No:</strong> {profile.username}
        </p>
        <p className="profile-item">
          <strong className="profile-label">Ad Soyad:</strong> {profile.firstName} {profile.lastName}
        </p>
        <p className="profile-item">
          <strong className="profile-label">Bölüm:</strong> {profile.department || '—'}
        </p>
        <p className="profile-item">
          <strong className="profile-label">Rol:</strong> {profile.role === 'admin' ? 'Yönetici' : 'Öğrenci'}
        </p>
        <button
          onClick={logout}
          className="profile-logout-button"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
