import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const produtosRouter = Router();

produtosRouter.get('/', async (req, res) => {
  const empresaId = req.query.empresaId as string | undefined;
  const where = empresaId ? { empresaId } : {};
  const data = await prisma.produto.findMany({ where, orderBy: { criadoEm: 'desc' } });
  res.json(data);
});

produtosRouter.post('/', async (req, res) => {
  const { empresaId, nome, ncm, cfop } = req.body;
  if (!empresaId || !nome || !ncm) return res.status(400).json({ error: 'empresaId, nome e ncm são obrigatórios' });
  const created = await prisma.produto.create({ data: { empresaId, nome, ncm, cfop } });
  res.status(201).json(created);
});
