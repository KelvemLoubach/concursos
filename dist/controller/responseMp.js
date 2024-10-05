"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMp = void 0;
const pagamentMp_1 = require("../configMp/pagamentMp");
const responseMp = async (req, res) => {
    try {
        const dados = req.body;
        const transactionAmount = parseFloat(dados.transaction_amount);
        const body = {
            items: [
                {
                    id: '11234',
                    title: 'Dummy Title',
                    description: 'Dummy description',
                    picture_url: 'http://www.myapp.com/myimage.jpg',
                    category_id: 'car_electronics',
                    quantity: 1,
                    currency_id: 'BRL',
                    unit_price: 1,
                },
            ],
            marketplace_fee: 0,
            payer: {
                name: 'Kelvem',
                surname: 'Loubach',
                email: 'your522_test_email@example.com',
                phone: {
                    area_code: '11',
                    number: '4444-4444',
                },
                identification: {
                    type: 'CPF',
                    number: '11191129100',
                },
            },
            back_urls: {
                success: 'https://concursos.onrender.com/notificationMp',
                failure: 'http://test.com/failure',
                pending: 'http://test.com/pending',
            },
            differential_pricing: {
                id: 1,
            },
            expires: false,
            additional_info: 'Discount: 12.00',
            auto_return: 'all',
            binary_mode: true,
            external_reference: '1643827245',
            marketplace: 'marketplace',
            notification_url: 'https://48b9-186-192-8-140.ngrok-free.app/notificationMp',
            operation_type: 'regular_payment',
            payment_methods: {
                default_payment_method_id: 'master',
                excluded_payment_types: [
                    {
                        id: 'ticket',
                    },
                ],
                excluded_payment_methods: [
                    {
                        id: '',
                    },
                ],
                installments: 5,
                default_installments: 1,
            },
            statement_descriptor: 'Test Store',
        };
        const response = await pagamentMp_1.preference.create({ body });
        return res.status(200).json({ response });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};
exports.responseMp = responseMp;
