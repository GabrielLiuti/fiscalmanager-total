import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const empresasRouter = Router();

empresasRouter.get('/', async (_req, res) => {
  const data = await prisma.empresa.findMany({ orderBy: { criadoEm: 'desc' } });
  res.json(data);
});

empresasRouter.post('/', async (req, res) => {
  const { nome, cnpj } = req.body;
  if (!nome || !cnpj) return res.status(400).json({ error: 'nome e cnpj são obrigatórios' });
  const created = await prisma.empresa.create({ data: { nome, cnpj } });
  res.status(201).json(created);
});
