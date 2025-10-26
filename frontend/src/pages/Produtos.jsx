// frontend/src/pages/Produtos.jsx
import React, { useEffect, useState } from "react";
import api from "../services/api";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [novo, setNovo] = useState({ descricao: "", preco: "", ncm: "", empresaId: "" });

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const res = await api.get("/produtos");
      setProdutos(res.data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    }
  };

  const criarProduto = async (e) => {
    e.preventDefault();
    try {
      await api.post("/produtos", novo);
      alert("✅ Produto criado!");
      setNovo({ descricao: "", preco: "", ncm: "", empresaId: "" });
      carregarProdutos();
    } catch (err) {
      alert("❌ Erro ao criar produto.");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2>Produtos</h2>

      <form onSubmit={criarProduto}>
        <input
          placeholder="Descrição"
          value={novo.descricao}
          onChange={e => setNovo({ ...novo, descricao: e.target.value })}
          required
        />
        <input
          placeholder="Preço"
          type="number"
          value={novo.preco}
          onChange={e => setNovo({ ...novo, preco: e.target.value })}
          required
        />
        <input
          placeholder="NCM"
          value={novo.ncm}
          onChange={e => setNovo({ ...novo, ncm: e.target.value })}
          required
        />
        <input
          placeholder="ID da Empresa"
          type="number"
          value={novo.empresaId}
          onChange={e => setNovo({ ...novo, empresaId: e.target.value })}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <ul>
        {produtos.map(p => (
          <li key={p.id}>
            {p.descricao} — R$ {p.preco} — NCM: {p.ncm}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Produtos;
