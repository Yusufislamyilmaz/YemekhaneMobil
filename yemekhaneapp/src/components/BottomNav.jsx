// src/components/BottomNav.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CalendarDaysIcon,
  ChatBubbleOvalLeftIcon,
  MapPinIcon,
  CreditCardIcon,
  InboxArrowDownIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/sirnak-logo-square.png';

export default function BottomNav() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const isActive = to => pathname === to;

  return (
    <nav className="bottom-nav">
      {/* 1. Aylık Menü */}
      <Link to="/aylik" className={`bottom-nav__link${isActive('/aylik') ? ' active' : ''}`}>
        <CalendarDaysIcon className="icon" />
        <span className="bottom-nav__label">Aylık</span>
      </Link>

      {/* 2. Konum */}
      <Link to="/location" className={`bottom-nav__link${isActive('/location') ? ' active' : ''}`}>
        <MapPinIcon className="icon" />
        <span className="bottom-nav__label">Konum</span>
      </Link>

      {/* 3. Ana Sayfa */}
      <Link to="/" className="bottom-nav__home">
        <img src={logo} alt="Ana Sayfa" className="home-logo" />
      </Link>

      {/* 4. Kart Bilgileri veya Mesajlar */}
      {user.role === 'admin' ? (
        <Link
          to="/messages"
          className={`bottom-nav__link${isActive('/messages') ? ' active' : ''}`}
        >
          <InboxArrowDownIcon className="icon" />
          <span className="bottom-nav__label">Mesajlar</span>
        </Link>
      ) : (
        <Link
          to="/card-info"
          className={`bottom-nav__link${isActive('/card-info') ? ' active' : ''}`}
        >
          <CreditCardIcon className="icon" />
          <span className="bottom-nav__label">Kart Bilgileri</span>
        </Link>
      )}

      {/* 5. Profil */}
      <Link
        to="/profile"
        className={`bottom-nav__link${isActive('/profile') ? ' active' : ''}`}
      >
        <UserIcon className="icon" />
        <span className="bottom-nav__label">Profil</span>
      </Link>
    </nav>
  );
}
