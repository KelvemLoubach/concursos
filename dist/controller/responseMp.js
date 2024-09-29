"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMp = void 0;
const pagamentMp_1 = require("../configMp/pagamentMp");
const body = {
    transaction_amount: 12.34,
    description: '1 crédito',
    payment_method_id: '5343436',
    payer: {
        email: 'kelvem21@gmail.com'
    },
};
const responseMp = async (req, res) => {
    try {
        const result = await pagamentMp_1.payment.create({ body });
        return res.status(200).json({ result });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};
exports.responseMp = responseMp;
