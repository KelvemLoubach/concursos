"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Função para extrair informações de pagamento
const extractPaymentInfo = (paymentInf) => {
  const quantity = paymentInf.data.bundles[0].products[0].quantity;
  const email = paymentInf.data.customer.email;
  return { quantity, email };
};
// Função principal para processar a notificação
const notificationAppMaxx = async (req, res) => {
  try {
    const paymentInf = req.body;
    const { quantity, email } = extractPaymentInfo(paymentInf);
    if (paymentInf.data.status === "aprovado") {
      // Simulação de processamento bem-sucedido
      console.log(
        `Pagamento aprovado para ${email} com quantidade ${quantity}.`
      );
      res.status(200).json({
        message: "Pagamento aprovado com sucesso.",
        data: {
          email,
          quantity,
          status: paymentInf.data.status,
          transactionId: paymentInf.data.transactionId, // Supondo que você tenha um ID de transação
        },
      });
    } else {
      // Resposta para pagamento não aprovado
      res.status(400).json({
        error: "Pagamento não aprovado.",
        details: {
          email,
          quantity,
          status: paymentInf.data.status,
        },
      });
    }
  } catch (error) {
    console.error("Erro ao processar a notificação:", error);
    res.status(500).json({
      error: "Erro interno ao processar a notificação.",
      details: error.message, // Inclui a mensagem de erro
    });
  }
};
exports.default = notificationAppMaxx;
