import express from "express";
import router from "./routers/router";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

// Verificar se a porta está definida
const PORT = process.env.PORT || 3000; // Valor padrão se a PORT não estiver definida

const server = express();

// Middleware
server.use(cors());
server.use(helmet()); // Adiciona segurança com cabeçalhos HTTP
server.use(morgan("dev")); // Log das requisições
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Roteamento
server.use(router);

// Tratamento de erros global
server.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Ocorreu um erro no servidor." });
  }
);

// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`Rodando na porta: ${PORT}`);
});
