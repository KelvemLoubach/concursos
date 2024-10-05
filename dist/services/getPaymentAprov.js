"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateCredtsFirebase_1 = __importDefault(require("../services/updateCredtsFirebase"));
const pagamentMp_1 = require("../configMp/pagamentMp");
const handlePayment = async (paymentId) => {
    try {
        const paymentData = await pagamentMp_1.payment.get({ id: paymentId });
        const status = paymentData.status;
        console.log(`Status do pagamento: ${status}`);
        if (status === 'approved') {
            (0, updateCredtsFirebase_1.default)('jailsondpd@gmail.com', 1);
            console.log('Pagamento aprovado');
        }
        else if (status === 'pending') {
            console.log('Pagamento pendente');
        }
        else if (status === 'rejected') {
            console.log('Pagamento rejeitado');
        }
    }
    catch (error) {
        console.error('Erro ao verificar o pagamento:', error);
    }
};
exports.default = handlePayment;
