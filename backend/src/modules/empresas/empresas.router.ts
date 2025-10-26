import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const schema = z.object({
  nome: z.string().min(2),
  cnpj: z.string().min(14),
  endereco: z.string().optional()
});

// Criar empresa
router.post('/', async (req, res) => {
  const parse = schema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Dados inválidos' });

  const empresa = await prisma.empresa.create({ data: parse.data });
  res.json(empresa);
});

// Listar todas
router.get('/', async (req, res) => {
  const empresas = await prisma.empresa.findMany({ include: { produtos: true, notas: true } });
  res.json(empresas);
});

// Buscar por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const empresa = await prisma.empresa.findUnique({ where: { id }, include: { produtos: true, notas: true } });
  if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada' });
  res.json(empresa);
});

// Atualizar
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const parse = schema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Dados inválidos' });

  const empresa = await prisma.empresa.update({ where: { id }, data: parse.data });
  res.json(empresa);
});

// Deletar
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  await prisma.empresa.delete({ where: { id } });
  res.json({ message: 'Empresa removida com sucesso' });
});

export default router;
