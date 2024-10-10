import { Request, Response } from "express";
import  updatCredtByEmailUser from "../services/updateCredtsFirebase"

const responseNotificationMp = async (req: Request, res: Response): Promise<any> => {
  try {
  
    const paymentInf = req.body;

    const quantity = paymentInf.data.bundles[0].products[0].quantity as number;
    const email = paymentInf.data.customer.email as string;
    

    if(paymentInf.data.status === 'aprovado'){
      updatCredtByEmailUser(email,quantity)
    }else{
    return res.status(400);
    }

    return res.sendStatus(200)

  } catch (error) {
    console.error('Erro ao processar a notificação:', error);
    return res.status(400).json({ error });
  }
};


export default responseNotificationMp;
