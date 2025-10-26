import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import empresasRouter from "./modules/empresas/empresas.router.js";
import produtosRouter from "./modules/produtos/produtos.router.js";
import notasRouter from "./modules/notas/notas.router.js";

const app = express();

// Configurações básicas
app.use(cors());
app.use(helmet());
app.use(express.json());

// Swagger (documentação)
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas principais
app.use("/api/empresas", empresasRouter);
app.use("/api/produtos", produtosRouter);
app.use("/api/notas", notasRouter);

// Rota padrão
app.get("/", (_, res) => res.send("✅ API FiscalManager Total online!"));

export default app;
