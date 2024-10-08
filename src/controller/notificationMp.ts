import { Request, Response } from "express";
import sha256 from "../services/sha256Mp";


const responseNotificationMp = async (req: Request, res: Response): Promise<any> => {
  try {
    const headers = req.headers;
    const data = req.body;


    // const topic = data.topic;


    // const xSignature = headers['x-signature'];
    // const xRequestId = headers['x-request-id'];

    //sha256(xSignature,data.id,xRequestId)

    // console.log(`${xSignature} aqui assinatura`);
    // console.log(`${xRequestId} aqui id`);


    // if (topic === 'payment') {

    //   const paymentId = data.id;
    //   await handlePayment(paymentId);
    
     
    //   console.log(`Aqui paymentId ${paymentId}`)

    // } else if (topic === 'merchant_order') {
    //   const orderId = data.id;
    //   console.log(`Aqui order id ${orderId}`)
    // }


    res.sendStatus(200);

  } catch (error) {
    console.error('Erro ao processar a notificação:', error);
    return res.status(400).json({ error });
  }
};


export default responseNotificationMp;
