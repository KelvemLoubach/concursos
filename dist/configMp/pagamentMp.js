"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = void 0;
const mercadopago_1 = require("mercadopago");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new mercadopago_1.MercadoPagoConfig({ accessToken: process.env.API_KEY_MP, options: { timeout: 5000, idempotencyKey: 'abc' } });
exports.payment = new mercadopago_1.Payment(client);
