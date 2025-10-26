import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const schema = z.object({
  nome: z.string().min(2),
  preco: z.number(),
  empresaId: z.number().optional()
});

// Criar produto
router.post('/', async (req, res) => {
  const parse = schema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Dados inválidos' });

  const produto = await prisma.produto.create({ data: parse.data });
  res.json(produto);
});

// Listar todos
router.get('/', async (req, res) => {
  const produtos = await prisma.produto.findMany({ include: { empresa: true } });
  res.json(produtos);
});

// Buscar por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const produto = await prisma.produto.findUnique({ where: { id }, include: { empresa: true } });
  if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
  res.json(produto);
});

// Atualizar
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const parse = schema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Dados inválidos' });

  const produto = await prisma.produto.update({ where: { id }, data: parse.data });
  res.json(produto);
});

// Deletar
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  await prisma.produto.delete({ where: { id } });
  res.json({ message: 'Produto removido com sucesso' });
});

export default router;
