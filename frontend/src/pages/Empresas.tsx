import React, { useEffect, useState } from "react";
import axios from "axios";

interface Empresa {
  id: number;
  nome: string;
  cnpj: string;
  endereco?: string;
}

const Empresas: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [novaEmpresa, setNovaEmpresa] = useState({ nome: "", cnpj: "", endereco: "" });

  const api = axios.create({
    baseURL: "https://fiscalmanager-backend.onrender.com/api",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  const carregarEmpresas = async () => {
    try {
      const res = await api.get("/empresas");
      setEmpresas(res.data);
    } catch {
      alert("Erro ao carregar empresas");
    }
  };

  const criarEmpresa = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/empresas", novaEmpresa);
      setNovaEmpresa({ nome: "", cnpj: "", endereco: "" });
      carregarEmpresas();
    } catch {
      alert("Erro ao criar empresa");
    }
  };

  useEffect(() => {
    carregarEmpresas();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Empresas</h1>

      <form onSubmit={criarEmpresa} className="mb-6 flex flex-col md:flex-row gap-3">
        <input
          placeholder="Nome"
          value={novaEmpresa.nome}
          onChange={(e) => setNovaEmpresa({ ...novaEmpresa, nome: e.target.value })}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          placeholder="CNPJ"
          value={novaEmpresa.cnpj}
          onChange={(e) => setNovaEmpresa({ ...novaEmpresa, cnpj: e.target.value })}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          placeholder="Endereço"
          value={novaEmpresa.endereco}
          onChange={(e) => setNovaEmpresa({ ...novaEmpresa, endereco: e.target.value })}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar
        </button>
      </form>

      <table className="w-full border-collapse border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">CNPJ</th>
            <th className="p-2 border">Endereço</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((emp) => (
            <tr key={emp.id} className="text-center">
              <td className="border p-2">{emp.id}</td>
              <td className="border p-2">{emp.nome}</td>
              <td className="border p-2">{emp.cnpj}</td>
              <td className="border p-2">{emp.endereco || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Empresas;
