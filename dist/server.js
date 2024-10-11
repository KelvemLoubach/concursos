"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routers/router"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
// Verificar se a porta está definida
const PORT = process.env.PORT || 3000; // Valor padrão se a PORT não estiver definida
const server = (0, express_1.default)();
// Middleware
server.use((0, cors_1.default)());
server.use((0, helmet_1.default)()); // Adiciona segurança com cabeçalhos HTTP
server.use((0, morgan_1.default)("dev")); // Log das requisições
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
// Roteamento
server.use(router_1.default);
// Tratamento de erros global
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Ocorreu um erro no servidor." });
});
// Iniciar o servidor
server.listen(PORT, () => {
    console.log(`Rodando na porta: ${PORT}`);
});
