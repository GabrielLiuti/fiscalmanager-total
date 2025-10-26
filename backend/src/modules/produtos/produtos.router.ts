import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// ✅ Listar todos os produtos
router.get("/", async (_req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

// ✅ Criar novo produto
router.post("/", async (req, res) => {
  const { nome, preco, empresaId } = req.body;
  if (!nome || !preco)
    return res.status(400).json({ error: "Nome e preço são obrigatórios." });

  const produto = await prisma.produto.create({
    data: { nome, preco: Number(preco), empresaId },
  });
  res.status(201).json(produto);
});

// ✅ Buscar produto por ID
router.get("/:id", async (req, res) => {
  const produto = await prisma.produto.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!produto) return res.status(404).json({ error: "Produto não encontrado." });
  res.json(produto);
});

// ✅ Atualizar produto
router.put("/:id", async (req, res) => {
  const { nome, preco } = req.body;
  const produto = await prisma.produto.update({
    where: { id: Number(req.params.id) },
    data: { nome, preco: Number(preco) },
  });
  res.json(produto);
});

// ✅ Deletar produto
router.delete("/:id", async (req, res) => {
  await prisma.produto.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Produto deletado com sucesso." });
});

export default router;
