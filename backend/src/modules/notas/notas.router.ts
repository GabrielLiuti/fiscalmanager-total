import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const schema = z.object({
  numero: z.string(),
  empresaId: z.number(),
  itens: z.array(
    z.object({
      produtoId: z.number(),
      quantidade: z.number(),
      valor: z.number()
    })
  )
});

// Criar nota fiscal
router.post('/', async (req, res) => {
  const parse = schema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Dados inválidos' });

  const { numero, empresaId, itens } = parse.data;
  const nota = await prisma.notaFiscal.create({
    data: {
      numero,
      empresaId,
      itens: {
        create: itens.map(i => ({
          produtoId: i.produtoId,
          quantidade: i.quantidade,
          valor: i.valor
        }))
      }
    },
    include: { itens: true }
  });

  res.json(nota);
});

// Listar notas
router.get('/', async (req, res) => {
  const notas = await prisma.notaFiscal.findMany({ include: { itens: true } });
  res.json(notas);
});

// Buscar por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const nota = await prisma.notaFiscal.findUnique({ where: { id }, include: { itens: true } });
  if (!nota) return res.status(404).json({ error: 'Nota não encontrada' });
  res.json(nota);
});

// Deletar
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  await prisma.notaFiscal.delete({ where: { id } });
  res.json({ message: 'Nota removida com sucesso' });
});

export default router;
