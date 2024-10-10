import {Request, Response} from "express";
import {creatClientId, createOrderId,creatPayment} from "../services/clientOrderPaymentAppmaxx"
import { dataAppmaxx,PaymentData } from "../interfaces/dataForAppmaxx";

const gatwayAppmaxx = async (req:Request, res:Response):Promise< string | any> => {

  const dataClient = req.body;
console.log('******************' + dataClient.firstname)
  console.log('******************' + dataClient.lastname)
  console.log('******************' + dataClient.email)
  console.log('******************' + dataClient.telephone)
console.log('******************' + dataClient.document_number)
  console.log('******************' + dataClient.expiration_date)
    try {

      const clientId = await creatClientId(dataClient);
      const orderId = await createOrderId(clientId,dataClient.total,dataClient.qty);
      const paymentDataOrerror = await creatPayment(clientId,orderId,dataClient.documente_number,dataClient.expiration_data);

      console.log(paymentDataOrerror)

      if(paymentDataOrerror.success !== 'ATIVA' && paymentDataOrerror.status !== 200 ){
        return res.status(400).json(paymentDataOrerror)
      }
  
      return res.status(200).json({"Paymente data":paymentDataOrerror}) ;

    } catch (error) {

      console.error('Erro ao criar cliente:', error );
      return res.status(400).json({error})
      
    }
};


export default gatwayAppmaxx;
