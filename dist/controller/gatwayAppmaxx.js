"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientOrderPaymentAppmaxx_1 = require("../services/clientOrderPaymentAppmaxx");
const gatwayAppmaxx = async (req, res) => {
    const dataClient = req.body;
    try {
        const clientId = await (0, clientOrderPaymentAppmaxx_1.creatClientId)(dataClient);
        const orderId = await (0, clientOrderPaymentAppmaxx_1.createOrderId)(clientId, dataClient.total, dataClient.qty);
        const paymentDataOrerror = await (0, clientOrderPaymentAppmaxx_1.creatPayment)(clientId, orderId, dataClient.documente_number, dataClient.expiration_data);
        console.log(paymentDataOrerror);
        if (paymentDataOrerror.success !== 'ATIVA' && paymentDataOrerror.status !== 200) {
            return res.status(400).json(paymentDataOrerror);
        }
        return res.status(200).json({ "Paymente data": paymentDataOrerror });
    }
    catch (error) {
        console.error('Erro ao criar cliente:', error);
        return res.status(400).json({ error });
    }
};
exports.default = gatwayAppmaxx;
