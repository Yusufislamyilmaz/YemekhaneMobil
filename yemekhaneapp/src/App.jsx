import { Routes, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <nav style={{ padding: '8px 16px', background: '#1976d2' }}>
        <Link to="/" style={{ color: '#fff', marginRight: 12 }}>Ana Sayfa</Link>
        <Link to="/login" style={{ color: '#fff' }}>Giriş</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

function Home() {
  return <h1 style={{ padding: 16 }}>Bugünün Menüsü</h1>;
}

function Login() {
  return <h1 style={{ padding: 16 }}>Login Sayfası</h1>;
}
