import React, { useEffect, useState, FormEvent } from "react";
import api from "../services/api";


interface Nota {
  id: number;
  empresaId: number;
  total: number;
}

interface ProdutoNota {
  produtoId: string;
  quantidade: string;
  precoUnitario: string;
}

interface NovaNota {
  empresaId: string;
  produtos: ProdutoNota[];
}

const Notas: React.FC = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [nova, setNova] = useState<NovaNota>({
    empresaId: "",
    produtos: [{ produtoId: "", quantidade: "", precoUnitario: "" }]
  });

  useEffect(() => {
    carregarNotas();
  }, []);

  const carregarNotas = async () => {
    try {
      const res = await api.get("/notas");
      setNotas(res.data);
    } catch (err) {
      console.error("Erro ao carregar notas:", err);
    }
  };

  const criarNota = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/notas", nova);
      alert("✅ Nota fiscal criada com sucesso!");
      setNova({
        empresaId: "",
        produtos: [{ produtoId: "", quantidade: "", precoUnitario: "" }]
      });
      carregarNotas();
    } catch (err) {
      console.error("Erro ao criar nota:", err);
      alert("❌ Erro ao criar nota fiscal.");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h2>Notas Fiscais</h2>

      <form onSubmit={criarNota} style={{ marginBottom: 20 }}>
        <input
          placeholder="ID da Empresa"
          value={nova.empresaId}
          onChange={e => setNova({ ...nova, empresaId: e.target.value })}
          required
        />
        <input
          placeholder="ID do Produto"
          value={nova.produtos[0].produtoId}
          onChange={e =>
            setNova({
              ...nova,
              produtos: [{ ...nova.produtos[0], produtoId: e.target.value }]
            })
          }
          required
        />
        <input
          placeholder="Quantidade"
          value={nova.produtos[0].quantidade}
          onChange={e =>
            setNova({
              ...nova,
              produtos: [{ ...nova.produtos[0], quantidade: e.target.value }]
            })
          }
          required
        />
        <input
          placeholder="Preço Unitário"
          value={nova.produtos[0].precoUnitario}
          onChange={e =>
            setNova({
              ...nova,
              produtos: [{ ...nova.produtos[0], precoUnitario: e.target.value }]
            })
          }
          required
        />
        <button type="submit">Emitir Nota</button>
      </form>

      <ul>
        {notas.map(n => (
          <li key={n.id}>
            <strong>Nota #{n.id}</strong> — Empresa {n.empresaId} — Total: R$ {n.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notas;
