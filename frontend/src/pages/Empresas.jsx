// frontend/src/pages/Empresas.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [nova, setNova] = useState({ nome: "", cnpj: "", endereco: "" });

  useEffect(() => {
    carregarEmpresas();
  }, []);

  const carregarEmpresas = async () => {
    try {
      const res = await api.get("/empresas");
      setEmpresas(res.data);
    } catch (err) {
      console.error("Erro ao carregar empresas:", err);
    }
  };

  const criarEmpresa = async (e) => {
    e.preventDefault();
    try {
      await api.post("/empresas", nova);
      alert("✅ Empresa criada!");
      setNova({ nome: "", cnpj: "", endereco: "" });
      carregarEmpresas();
    } catch (err) {
      alert("❌ Erro ao criar empresa.");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2>Empresas</h2>

      <form onSubmit={criarEmpresa}>
        <input
          placeholder="Nome"
          value={nova.nome}
          onChange={e => setNova({ ...nova, nome: e.target.value })}
          required
        />
        <input
          placeholder="CNPJ"
          value={nova.cnpj}
          onChange={e => setNova({ ...nova, cnpj: e.target.value })}
          required
        />
        <input
          placeholder="Endereço"
          value={nova.endereco}
          onChange={e => setNova({ ...nova, endereco: e.target.value })}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <ul>
        {empresas.map(e => (
          <li key={e.id}>{e.nome} - {e.cnpj}</li>
        ))}
      </ul>
    </div>
  );
}

export default Empresas;
