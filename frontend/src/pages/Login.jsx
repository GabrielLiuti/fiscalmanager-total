// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, senha });
      localStorage.setItem("token", response.data.token);
      alert("✅ Login realizado com sucesso!");
      window.location.href = "/dashboard";
    } catch (error) {
      setErro("❌ Credenciais inválidas.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Login FiscalManager</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}

export default Login;
