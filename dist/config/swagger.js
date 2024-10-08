"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Api recurso do concurseiro',
            version: '1.0.0',
            description: 'Documentação da API utilizando Swagger',
            contact: {
                name: 'Kelvem',
                url: 'https://seusite.com',
                email: 'seuemail@dominio.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3030',
                description: 'Servidor local'
            }
        ],
    },
    apis: ['./src/routers/*.ts'],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
exports.default = swaggerDocs;
