import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { authRouter } from './modules/auth/auth.router.js';
import { empresasRouter } from './modules/empresas/empresas.router.js';
import { produtosRouter } from './modules/produtos/produtos.router.js';
import { notasRouter } from './modules/notas/notas.router.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Swagger setup
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas principais
import authRoutes from "./modules/auth/auth.router";
import empresasRoutes from "./modules/empresas/empresas.router";
import produtosRoutes from "./modules/produtos/produtos.router";
import notasRoutes from "./modules/notas/notas.router";

app.use("/api/auth", authRoutes);
app.use("/api/empresas", empresasRoutes);
app.use("/api/produtos", produtosRoutes);
app.use("/api/notas", notasRoutes);

export default app;
