"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatPayment = exports.createOrderId = exports.creatClientId = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const tokenProducao = process.env.APPMAX_ACESS_TOKEN_PRODUCAO;
const creatClientId = async (dataClient) => {
    try {
        const response = await axios_1.default.post('https://admin.appmax.com.br/api/v3/customer', {
            "access-token": tokenProducao,
            "firstname": dataClient.firstname,
            "lastname": dataClient.lastname,
            "email": dataClient.email,
            "telephone": dataClient.telephone,
        });
        console.log('tipo id cliente na requisição ' + typeof response.data.data.id);
        return response.data.data.id;
    }
    catch (error) {
        return error;
    }
};
exports.creatClientId = creatClientId;
const createOrderId = async (clientId, total, qty) => {
    try {
        const response = await axios_1.default.post('https://admin.appmax.com.br/api/v3/order', {
            "access-token": tokenProducao,
            "total": total,
            "products": [
                {
                    "sku": "123123",
                    "name": "My product 1",
                    "qty": qty
                }
            ],
            "customer_id": clientId,
        });
        console.log('Order id' + response.data.data.id);
        console.log('Order id tipo ' + typeof response.data.data.id);
        return response.data.data.id;
    }
    catch (error) {
        return error;
    }
};
exports.createOrderId = createOrderId;
const creatPayment = async (clienteId, orderId, document_number, expiration_data) => {
    try {
        const response = await axios_1.default.post('https://admin.appmax.com.br/api/v3/payment/pix', {
            "access-token": tokenProducao,
            "cart": {
                "order_id": orderId
            },
            "customer": {
                "customer_id": clienteId
            },
            "payment": {
                "pix": {
                    "document_number": document_number,
                    "expiration_date": expiration_data,
                }
            }
        });
        return response.data;
    }
    catch (error) {
        console.log(`Erros em criar pagamento ${error}`);
        return error;
    }
};
exports.creatPayment = creatPayment;
