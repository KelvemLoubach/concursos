"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientOrderPaymentAppmaxx_1 = require("../services/clientOrderPaymentAppmaxx");
const gatwayAppmaxx = async (req, res) => {
    try {
        const clientId = await (0, clientOrderPaymentAppmaxx_1.creatClientId)();
        const orderId = await (0, clientOrderPaymentAppmaxx_1.createOrderId)(clientId);
        const paymentData = await (0, clientOrderPaymentAppmaxx_1.creatPayment)(clientId, orderId);
        return res.status(200).json({ "Cliente id ": clientId });
    }
    catch (error) {
        console.error('Erro ao criar cliente:', error);
        return res.status(400).json({ error });
    }
};
exports.default = gatwayAppmaxx;
