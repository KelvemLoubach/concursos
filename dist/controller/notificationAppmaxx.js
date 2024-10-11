"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateCredtsFirebase_1 = __importDefault(require("../services/updateCredtsFirebase"));
const responseNotificationAppmax = async (req, res) => {
    try {
        const paymentInf = req.body;
        // Validação básica dos dados
        if (!paymentInf || !paymentInf.data || !paymentInf.data.bundles || !paymentInf.data.customer || !paymentInf.data.status) {
            return res.status(400).json({ error: "Dados de pagamento inválidos ou incompletos." });
        }
        const quantity = paymentInf.data.bundles[0]?.products[0]?.quantity;
        const email = paymentInf.data.customer.email;
        const status = paymentInf.data.status;
        // Verificando se todos os campos estão preenchidos corretamente
        if (!quantity || !email || typeof email !== 'string' || typeof quantity !== 'number') {
            return res.status(400).json({ error: "Informações de quantidade ou email inválidas." });
        }
        // Verifica se o status é 'aprovado'
        if (status === 'aprovado') {
            try {
                // Chama a função para atualizar os créditos, aguardando sua execução
                await (0, updateCredtsFirebase_1.default)(email, quantity);
            }
            catch (updateError) {
                console.error('Erro ao atualizar créditos:', updateError);
                return res.status(500).json({ error: "Erro ao atualizar créditos no banco de dados." });
            }
        }
        else {
            return res.status(400).json({ error: "Status de pagamento não aprovado." });
        }
        // Sucesso, retorna 200
        return res.sendStatus(200);
    }
    catch (error) {
        // Tratamento de erro geral
        console.error('Erro ao processar a notificação:', error);
        return res.status(500).json({ error: "Erro interno ao processar a notificação." });
    }
};
exports.default = responseNotificationAppmax;
