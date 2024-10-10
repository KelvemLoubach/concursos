import {Request, Response} from "express";
import {creatClientId, createOrderId,creatPayment} from "../services/clientOrderPaymentAppmaxx"
import { dataAppmaxx,PaymentData } from "../interfaces/dataForAppmaxx";


const gatwayAppmaxx = async (req:Request, res:Response):Promise<any> => {

  const dataClient = req.body as dataAppmaxx;

    try {

      const clientId = await creatClientId(dataClient);
      const orderId = await createOrderId(clientId,dataClient.total,dataClient.qty);
      const paymentData = await creatPayment(clientId,orderId,dataClient.documente_number,dataClient.expiration_data);

      console.log(paymentData)
    

      return res.status(200).json({"Paymente data":paymentData}) ;

      
    } catch (error) {


      console.error('Erro ao criar cliente:', error );
      return res.status(400).json({error})
      
    }
  
};


export default gatwayAppmaxx;