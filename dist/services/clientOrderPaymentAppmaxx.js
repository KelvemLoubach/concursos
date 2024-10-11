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
const axiosInstance = axios_1.default.create({
    baseURL: "https://admin.appmax.com.br/api/v3/",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});
// Função para tratar erros
const handleError = (error) => {
    if (error.response) {
        console.error("Erro na resposta da API:", error.response.data);
        return { success: false, ...error.response.data };
    }
    else if (error.request) {
        console.error("Erro na requisição:", error.request);
        return { success: false, message: "Erro na requisição" };
    }
    else {
        console.error("Erro desconhecido:", error.message);
        return { success: false, message: "Erro desconhecido" };
    }
};
const creatClientId = async (dataClient) => {
    try {
        const response = await axiosInstance.post("customer", {
            "access-token": tokenProducao,
            firstname: dataClient.firstname,
            lastname: dataClient.lastname,
            email: dataClient.email,
            telephone: dataClient.telephone,
        });
        console.log("Tipo id cliente na requisição:", typeof response.data.data.id);
        return { success: true, clientId: response.data.data.id };
    }
    catch (error) {
        return handleError(error);
    }
};
exports.creatClientId = creatClientId;
const createOrderId = async (clientId, total, qty) => {
    try {
        const response = await axiosInstance.post("order", {
            "access-token": tokenProducao,
            total: total,
            products: [
                {
                    sku: "123123",
                    name: "My product 1",
                    qty: qty,
                },
            ],
            customer_id: clientId,
        });
        console.log("Order id:", response.data.data.id);
        return { success: true, orderId: response.data.data.id };
    }
    catch (error) {
        return handleError(error);
    }
};
exports.createOrderId = createOrderId;
const creatPayment = async (clienteId, orderId, document_number, expiration_data) => {
    try {
        const response = await axiosInstance.post("payment/pix", {
            "access-token": tokenProducao,
            cart: {
                order_id: orderId,
            },
            customer: {
                customer_id: clienteId,
            },
            payment: {
                pix: {
                    document_number: document_number,
                    expiration_date: expiration_data,
                },
            },
        });
        return { success: true, paymentData: response.data };
    }
    catch (error) {
        console.log(`Erros em criar pagamento: ${error}`);
        return handleError(error);
    }
};
exports.creatPayment = creatPayment;
