"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preference = exports.payment = void 0;
const mercadopago_1 = require("mercadopago");
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
dotenv_1.default.config();
const newId = (0, uuid_1.v4)();
const client = new mercadopago_1.MercadoPagoConfig({ accessToken: process.env.API_KEY_MP, options: { timeout: 5000, idempotencyKey: newId } });
const payment = new mercadopago_1.Payment(client);
exports.payment = payment;
const preference = new mercadopago_1.Preference(client);
exports.preference = preference;
