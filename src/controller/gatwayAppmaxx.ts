import {Request, Response} from "express";
import {creatClientId, createOrderId,creatPayment} from "../services/clientOrderPaymentAppmaxx"
import { dataAppmaxx,PaymentData } from "../interfaces/dataForAppmaxx";

const gatwayAppmaxx = async (req:Request, res:Response):Promise< string | any> => {

  const dataClient = req.body;

    try {

      const clientId = await creatClientId(dataClient);
      console.log('******************' + clientId)
      const orderId = await createOrderId(clientId,dataClient.total,dataClient.qty);
      console.log('******************' + orderId)
      const paymentDataOrerror = await creatPayment(clientId,orderId,dataClient.documente_number,dataClient.expiration_data);
      console.log('******************' + paymentDataOrerror)

      console.log(paymentDataOrerror.data.data)

      if(paymentDataOrerror.success !== 'ATIVA' && paymentDataOrerror.status !== 200 ){
        return res.status(400).json(paymentDataOrerror)
      }
  
      return res.status(200).json({"Paymente data":paymentDataOrerror.data.data}) ;

    } catch (error) {

      console.error('Erro ao criar cliente:', error );
      return res.status(400).json({error})
      
    }
};


export default gatwayAppmaxx;
