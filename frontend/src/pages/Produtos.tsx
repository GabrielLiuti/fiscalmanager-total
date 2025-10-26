import React, { useEffect, useState } from "react";
import axios from "axios";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  ncm?: string;
}

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [novoProduto, setNovoProduto] = useState({ nome: "", preco: "", ncm: "" });

  const api = axios.create({
    baseURL: "https://fiscalmanager-backend.onrender.com/api",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  const carregarProdutos = async () => {
    try {
      const res = await api.get("/produtos");
      setProdutos(res.data);
    } catch {
      alert("Erro ao carregar produtos");
    }
  };

  const criarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/produtos", {
        nome: novoProduto.nome,
        preco: parseFloat(novoProduto.preco),
        ncm: novoProduto.ncm,
      });
      setNovoProduto({ nome: "", preco: "", ncm: "" });
      carregarProdutos();
    } catch {
      alert("Erro ao criar produto");
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Produtos</h1>

      <form onSubmit={criarProduto} className="mb-6 flex flex-col md:flex-row gap-3">
        <input
          placeholder="Nome"
          value={novoProduto.nome}
          onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          placeholder="Preço"
          type="number"
          value={novoProduto.preco}
          onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          placeholder="NCM"
          value={novoProduto.ncm}
          onChange={(e) => setNovoProduto({ ...novoProduto, ncm: e.target.value })}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Adicionar
        </button>
      </form>

      <table className="w-full border-collapse border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Preço</th>
            <th className="p-2 border">NCM</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((prod) => (
            <tr key={prod.id} className="text-center">
              <td className="border p-2">{prod.id}</td>
              <td className="border p-2">{prod.nome}</td>
              <td className="border p-2">R$ {prod.preco.toFixed(2)}</td>
              <td className="border p-2">{prod.ncm || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Produtos;
