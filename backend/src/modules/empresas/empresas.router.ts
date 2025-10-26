import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// ✅ Listar todas as empresas
router.get("/", async (_req, res) => {
  const empresas = await prisma.empresa.findMany();
  res.json(empresas);
});

// ✅ Criar nova empresa
router.post("/", async (req, res) => {
  const { nome, cnpj, endereco } = req.body;
  if (!nome || !cnpj)
    return res.status(400).json({ error: "Nome e CNPJ são obrigatórios." });

  const empresa = await prisma.empresa.create({
    data: { nome, cnpj, endereco },
  });
  res.status(201).json(empresa);
});

// ✅ Buscar empresa por ID
router.get("/:id", async (req, res) => {
  const empresa = await prisma.empresa.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!empresa) return res.status(404).json({ error: "Empresa não encontrada." });
  res.json(empresa);
});

// ✅ Atualizar empresa
router.put("/:id", async (req, res) => {
  const { nome, cnpj, endereco } = req.body;
  const empresa = await prisma.empresa.update({
    where: { id: Number(req.params.id) },
    data: { nome, cnpj, endereco },
  });
  res.json(empresa);
});

// ✅ Deletar empresa
router.delete("/:id", async (req, res) => {
  await prisma.empresa.delete({ where: { id: Number(req.params.id) } });
  res.json({ message: "Empresa deletada com sucesso." });
});

export default router;
