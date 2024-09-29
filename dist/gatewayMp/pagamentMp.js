"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mercadopago_1 = require("mercadopago");
const client = new mercadopago_1.MercadoPagoConfig({ accessToken: 'APP_USR-8695096528845739-092820-214f1c63ef5f3532bc43b88f4217a78a-272593219', options: { timeout: 5000, idempotencyKey: 'abc' } });
const payment = new mercadopago_1.Payment(client);
const body = {
    transaction_amount: 12.34,
    description: '<DESCRIPTION>',
    payment_method_id: '<PAYMENT_METHOD_ID>',
    payer: {
        email: '<EMAIL>'
    },
};
payment.create({ body })
    .then(console.log)
    .catch(console.log);
