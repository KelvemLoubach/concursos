"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatPayment = exports.createOrderId = exports.creatClientId = void 0;
const axios_1 = __importDefault(require("axios"));
const appmaxAccessTokenT = '75463A5D-84B8A987-D021CED5-9E03A070';
const tokenProducao = 'F216A0B6-AD88AA9A-8DD217A6-8CE7B695';
const creatClientId = async () => {
    try {
        const response = await axios_1.default.post('https://admin.appmax.com.br/api/v3/customer', {
            "access-token": tokenProducao,
            "firstname": "teste",
            "lastname": "teste",
            "email": "teste@teste.com",
            "telephone": "(11) 11111-1111",
            "postcode": "01010-000",
            "address_street": "Rua São Bento",
            "address_street_number": "111",
            "address_street_complement": "Bloco 7",
            "address_street_district": "Centro",
            "address_city": "São Paulo",
            "address_state": "SP",
            "ip": "127.0.0.1",
            "custom_txt": "Tênis de Corrida 39",
            "products": [
                {
                    "product_sku": "123456",
                    "product_qty": 2
                }
            ],
            "tracking": {
                "utm_source": "google",
                "utm_campaign": "black-friday",
                "utm_medium": "cpc",
                "utm_content": "tenis-corrida",
                "utm_term": "logo-link"
            }
        });
        console.log('tipo id cliente na requisição ' + typeof response.data.data.id);
        return response.data.data.id;
    }
    catch (error) {
        console.log('Erro aqui' + error);
        return error;
    }
};
exports.creatClientId = creatClientId;
const createOrderId = async (clientId) => {
    try {
        const response = await axios_1.default.post('https://admin.appmax.com.br/api/v3/order', {
            "access-token": tokenProducao,
            "total": 1.0,
            "products": [
                {
                    "sku": "123123",
                    "name": "My product 1",
                    "qty": 1
                }
            ],
            "customer_id": clientId,
            "discount": 0,
            "freight_type": "PAC"
        });
        console.log('Order id' + response.data.data.id);
        console.log('Order id tipo ' + typeof response.data.data.id);
        return response.data.data.id;
    }
    catch (error) {
        console.log(`Erro em criar a ordem `);
        return error;
    }
};
exports.createOrderId = createOrderId;
const creatPayment = async (clienteId, orderId) => {
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
                    "document_number": "14271239771",
                    "expiration_date": "2024-10-11 12:00:00",
                }
            }
        });
        console.log(response);
    }
    catch (error) {
        console.log(`Erros em criar pagamento ${error}`);
        return error;
    }
};
exports.creatPayment = creatPayment;
