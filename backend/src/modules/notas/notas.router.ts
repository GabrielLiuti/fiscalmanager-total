import { Router } from "express";
import multer from "multer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();
const upload = multer({ dest: "uploads/" });

// Listar notas fiscais
router.get("/", async (_req, res) => {
  const notas = await prisma.notaFiscal.findMany({
    include: { itens: true, empresa: true },
  });
  res.json(notas);
});

// Criar nova nota
router.post("/", async (req, res) => {
  const { numero, empresaId, total } = req.body;
  if (!numero || !empresaId)
    return res.status(400).json({ error: "Número e empresa são obrigatórios." });

  const nota = await prisma.notaFiscal.create({
    data: {
      numero,
      total: parseFloat(total) || 0,
      empresaId,
    },
  });
  res.status(201).json(nota);
});

// Upload de XML
router.post("/upload", upload.single("arquivo"), async (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: "Arquivo XML não enviado." });

  res.json({ message: "Upload recebido com sucesso.", file: req.file.filename });
});

// Deletar nota
router.delete("/:id", async (req, res) => {
  await prisma.notaFiscal.delete({ where: { id: req.params.id } });
  res.json({ message: "Nota fiscal removida com sucesso." });
});

export default router;
