import { Routes, Route, Link } from "react-router-dom";
import Login from "./features/auth/Login";
import Dashboard from "./pages/Dashboard";
import Notas from "./pages/Notas";

export default function App() {
  console.log("✅ App.tsx carregado!");

  return (
    <div className="container">
      <header>
        <nav>
          <Link to="/">Dashboard</Link> |{" "}
          <Link to="/notas">Notas</Link> |{" "}
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <main>
        <h1>🚀 FiscalManager Total</h1>
        <p>Frontend está funcionando corretamente!</p>

        <div className="card">
          <h2>Conexão Backend</h2>
          <p>Teste rápido de comunicação:</p>
          <button
            onClick={() =>
              fetch("https://fiscalmanager-backend.onrender.com/api/empresas")
                .then((res) => res.json())
                .then((data) =>
                  alert("Conexão OK ✅\nEmpresas: " + JSON.stringify(data))
                )
                .catch((err) => alert("Erro ao conectar ❌\n" + err))
            }
          >
            Testar conexão com API
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notas" element={<Notas />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}
