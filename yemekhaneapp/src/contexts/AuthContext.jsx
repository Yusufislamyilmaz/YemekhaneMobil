// src/contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const nav = useNavigate();
  const [user, setUser]            = useState(null);
  const [loading, setLoad]         = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const json = localStorage.getItem('user');
    if (json) setUser(JSON.parse(json));
    // localStorage'daki yeni kayıtları da al
    const regs = localStorage.getItem('registeredUsers');
    if (regs) setRegisteredUsers(JSON.parse(regs));
    setLoad(false);                             // ② localStorage kontrolü bitti
  }, []);

  async function login(username, password) {
    // statik + localStorage kayıtlarını birleştir
    const staticUsers = await (await fetch('/users.json')).json();
    const allUsers    = [...staticUsers, ...registeredUsers];
    const found = allUsers.find(u => u.username === username && u.password === password);
    if (!found) return false;
    setUser(found);
    localStorage.setItem('user', JSON.stringify(found));
    return true;
  }

  function register(username, password) {
    // role hep student
    const newUser = { username, password, role: 'student' };
    const next = [...registeredUsers, newUser];
    setRegisteredUsers(next);
    localStorage.setItem('registeredUsers', JSON.stringify(next));
    // otomatik login
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('user');
    nav('/login');
  }

  return (
    <AuthCtx.Provider value={{ user, role: user?.role, loading, login, logout, register }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);

