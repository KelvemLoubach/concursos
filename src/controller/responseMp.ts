import {payment} from "../configMp/pagamentMp"
import { Request, Response } from "express";


const  body  =  { 
	transaction_amount : 12.34 , 
	description : '1 crédito' , 
	payment_method_id : '5343436' , 
	payer : { 
		email : 'kelvem21@gmail.com' 
	} , 
} ;

export const responseMp = async (req:Request, res:Response): Promise<any> => {

    try {
        const result = await payment.create({ body })

        return res.status(200).json({result})

    } catch (error) {

        return res.status(400).json({error})
    }
};