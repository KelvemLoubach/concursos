"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientOrderPaymentAppmaxx_1 = require("../services/clientOrderPaymentAppmaxx");
const gatwayAppmaxx = async (req, res) => {
    const dataClient = req.body;
    try {
        const clientResponse = await (0, clientOrderPaymentAppmaxx_1.creatClientId)(dataClient);
        if (!clientResponse.success) {
            res.status(400).json(clientResponse);
            return; // Saia da função após enviar a resposta
        }
        const clientId = clientResponse.clientId;
        console.log("ID do Cliente criado:", clientId); // Log do ID do cliente
        const orderResponse = await (0, clientOrderPaymentAppmaxx_1.createOrderId)(clientId, dataClient.total, dataClient.qty);
        if (!orderResponse.success) {
            res.status(400).json(orderResponse);
            return; // Saia da função após enviar a resposta
        }
        const orderId = orderResponse.orderId;
        console.log("ID da Ordem criada:", orderId); // Log do ID da ordem
        console.log("Criando pagamento com customerId:", clientId, "e orderId:", orderId);
        const paymentDataOrerror = await (0, clientOrderPaymentAppmaxx_1.creatPayment)(clientId, orderId, dataClient.document_number, dataClient.expiration_date);
        console.log("Dados do pagamento:", paymentDataOrerror); // Log dos dados do pagamento
        if (paymentDataOrerror.success === false) {
            res.status(400).json(paymentDataOrerror);
            return; // Saia da função após enviar a resposta
        }
        res.status(200).json({ "Payment data": paymentDataOrerror });
    }
    catch (error) {
        console.error("Erro ao processar a solicitação:", error);
        res.status(400).json({ error: "Erro ao processar a solicitação" });
    }
};
exports.default = gatwayAppmaxx;
