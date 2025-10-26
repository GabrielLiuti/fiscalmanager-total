import { Routes, Route, Link } from 'react-router-dom'
import Login from './features/auth/Login'
import Dashboard from './pages/Dashboard'
import Notas from './pages/Notas'

export default function App() {
  return (
    <div style={{ fontFamily: 'Inter, sans-serif', padding: 16 }}>
      <header style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <Link to="/">Dashboard</Link>
        <Link to="/notas">Notas</Link>
        <Link to="/login" style={{ marginLeft: 'auto' }}>Login</Link>
      </header>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notas" element={<Notas />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}
