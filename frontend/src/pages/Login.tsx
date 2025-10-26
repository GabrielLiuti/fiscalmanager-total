/// <reference types="vite/client" />
import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://fiscalmanager-backend.onrender.com/api/auth/login",
        { email, senha }
      );
      localStorage.setItem("token", res.data.token);
      window.location.href = "/empresas";
    } catch (err: any) {
      setErro(err.response?.data?.error || "Falha ao autenticar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Acesso ao FiscalManager
        </h2>

        <label className="block mb-4">
          <span className="text-gray-700">E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mt-2 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Senha</span>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="w-full mt-2 p-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </label>

        {erro && <p className="text-red-600 text-sm mb-3">{erro}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
