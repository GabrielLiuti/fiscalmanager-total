import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { authRouter } from './modules/auth/auth.router.js';
import { empresasRouter } from './modules/empresas/empresas.router.js';
import { produtosRouter } from './modules/produtos/produtos.router.js';
import { notasRouter } from './modules/notas/notas.router.js';

dotenv.config();
const app = express();
app.use(helmet());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

const origin = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

try {
  const doc = YAML.load(process.cwd() + '/docs/openapi.yaml');
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(doc));
} catch {}

app.use('/api/auth', authRouter);
app.use('/api/empresas', empresasRouter);
app.use('/api/produtos', produtosRouter);
app.use('/api/notas', notasRouter);

export { app };
