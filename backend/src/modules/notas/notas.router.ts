import { Router } from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const upload = multer({ limits: { fileSize: 2 * 1024 * 1024 } });
const prisma = new PrismaClient();
export const notasRouter = Router();

notasRouter.post('/import-xml', upload.array('files'), async (req, res) => {
  const empresaId = req.body.empresaId as string;
  if (!empresaId) return res.status(400).json({ error: 'empresaId é obrigatório' });
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    return res.status(400).json({ error: 'Arquivos XML são obrigatórios' });
  }
  const created = [];
  for (const f of req.files as Express.Multer.File[]) {
    const xml = f.buffer.toString('utf-8');
    const chave = 'CH' + Math.random().toString(36).slice(2, 12).toUpperCase();
    const nota = await prisma.notaFiscal.create({ data: { empresaId, chave, xmlRaw: xml } });
    created.push(nota);
  }
  res.status(201).json({ imported: created.length, notas: created });
});

notasRouter.get('/', async (req, res) => {
  const empresaId = req.query.empresaId as string | undefined;
  const where = empresaId ? { empresaId } : {};
  const data = await prisma.notaFiscal.findMany({ where, orderBy: { criadoEm: 'desc' } });
  res.json(data);
});
