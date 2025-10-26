import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Swagger
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas principais
import authRouter from "./modules/auth/auth.router";
import empresasRouter from "./modules/empresas/empresas.router";
import produtosRouter from "./modules/produtos/produtos.router";
import notasRouter from "./modules/notas/notas.router";


app.use("/api/auth", authRouter);
app.use("/api/empresas", empresasRouter);
app.use("/api/produtos", produtosRouter);
app.use("/api/notas", notasRouter);

export default app;
