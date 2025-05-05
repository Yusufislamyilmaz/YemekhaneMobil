// src/components/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ allowed }) {
  const { user, loading } = useAuth();

  if (loading) return null;                 // ① Henüz karar veremiyoruz → boş render

  if (!user)                               // ② Giriş yok
    return <Navigate to="/login" replace />;

  if (allowed && !allowed.includes(user.role))
    return <Navigate to="/" replace />;    // ③ Rol yetmiyorsa ana sayfa

  return <Outlet />;                       // ④ İzin verildi
}
