"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateCredtsFirebase_1 = __importDefault(require("../services/updateCredtsFirebase"));
const responseNotificationMp = async (req, res) => {
    try {
        const paymentInf = req.body;
        const quantity = paymentInf.data.bundles[0].products[0].quantity;
        const email = paymentInf.data.customer.email;
        if (paymentInf.data.status === 'aprovado') {
            (0, updateCredtsFirebase_1.default)(email, quantity);
        }
        else {
            return res.status(400);
        }
        return res.sendStatus(200);
    }
    catch (error) {
        console.error('Erro ao processar a notificação:', error);
        return res.status(400).json({ error });
    }
};
exports.default = responseNotificationMp;
