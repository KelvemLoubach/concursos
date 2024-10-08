import {Request, Response} from "express";
import {creatClientId, createOrderId,creatPayment} from "../services/clientOrderPaymentAppmaxx"


const gatwayAppmaxx = async (req:Request, res:Response):Promise<any> => {

    try {

      const clientId = await creatClientId();
      const orderId = await createOrderId(clientId);
      const paymentData = await creatPayment(clientId,orderId)

      return res.status(200).json({"Cliente id ":clientId}) ;

      
    } catch (error) {


      console.error('Erro ao criar cliente:', error );
      return res.status(400).json({error})
      
    }
  
};


export default gatwayAppmaxx;