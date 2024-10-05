"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPaymentAprov_1 = __importDefault(require("../services/getPaymentAprov"));
const sha256Mp_1 = __importDefault(require("../services/sha256Mp"));
const responseNotificationMp = async (req, res) => {
    try {
        const headers = req.headers;
        const data = req.query;
        const topic = data.topic;
        const xSignature = headers['x-signature'];
        const xRequestId = headers['x-request-id'];
        (0, sha256Mp_1.default)(xSignature, data.id, xRequestId);
        console.log(`${xSignature} aqui assinatura`);
        console.log(`${xRequestId} aqui id`);
        console.log(`aqui query`, JSON.stringify(data, null, 2));
        if (topic === 'payment') {
            const paymentId = data.id;
            await (0, getPaymentAprov_1.default)(paymentId);
            console.log(`Aqui paymentId ${paymentId}`);
        }
        else if (topic === 'merchant_order') {
            const orderId = data.id;
            console.log(`Aqui order id ${orderId}`);
        }
        res.sendStatus(200);
    }
    catch (error) {
        console.error('Erro ao processar a notificação:', error);
        return res.status(400).json({ error });
    }
};
exports.default = responseNotificationMp;
