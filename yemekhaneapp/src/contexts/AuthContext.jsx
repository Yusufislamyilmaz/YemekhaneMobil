// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const nav = useNavigate();
  const [user, setUser]     = useState(null);
  const [loading, setLoad]  = useState(true);   // ①

  useEffect(() => {
    const json = localStorage.getItem('user');
    if (json) setUser(JSON.parse(json));
    setLoad(false);                             // ② localStorage kontrolü bitti
  }, []);

  async function login(username, password) {
    const users = await (await fetch('/users.json')).json();
    const found = users.find(u => u.username === username && u.password === password);
    if (!found) return false;
    setUser(found);
    localStorage.setItem('user', JSON.stringify(found));
    return true;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
    nav('/login');
  }

  return (
    <AuthCtx.Provider value={{ user, role: user?.role, loading, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
