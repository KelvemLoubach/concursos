import { Request, Response } from "express";
import { payment } from "../configMp/pagamentMp";
import sha256 from "../services/sha256Mp";
import url from "url";

const responseNotificationMp = async (req: Request, res: Response): Promise<any> => {
  try {
    const headers = req.headers;
    const data2 = req.query;

    // Obtendo os valores dos cabeçalhos 'x-signature' e 'x-request-id'
    const xSignature = headers['x-signature'];
    const xRequestId = headers['x-request-id'];

    console.log(`${xSignature} aqui assinatura`);
    console.log(`${xRequestId} aqui id`);

    // // Parseando os parâmetros da URL para obter o 'data.id'
    // const parsedUrl = url.parse(req.url, true);
    // const dataID = parsedUrl.query['data.id'];

    console.log(`aqui query`, JSON.stringify(data2, null, 2));

    //sha256(xSignature, xRequestId, '6566');

    // Obtendo os dados do corpo da requisição
    const data = req.body;
    //const paymentId = data.data.id;

    console.log('Payment Data:', JSON.stringify(data, null, 2));
    console.log('******************************************');

    // Aguardar a execução de handlePayment
   // await handlePayment(paymentId);

    // Enviar status 200 somente após o processamento do pagamento
    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao processar a notificação:', error);
    return res.status(400).json({ error });
  }
};

const handlePayment = async (paymentId: any) => {
  try {
    const paymentData = await payment.get(paymentId);

    const status = paymentData.status;
    console.log(`Status do pagamento: ${status}`);

    if (status === 'approved') {
      console.log('Pagamento aprovado');
      // Lógica para pagamento aprovado
    } else if (status === 'pending') {
      console.log('Pagamento pendente');
      // Lógica para pagamento pendente
    } else if (status === 'rejected') {
      console.log('Pagamento rejeitado');
      // Lógica para pagamento rejeitado
    }
  } catch (error) {
    console.error('Erro ao verificar o pagamento:', error);
  }
};

export default responseNotificationMp;
