"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routers/router"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use(express_1.default.urlencoded({ extended: true }));
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(router_1.default);
server.listen(process.env.PORT);
console.log(`Rodando na porta: ${process.env.PORT}`);
