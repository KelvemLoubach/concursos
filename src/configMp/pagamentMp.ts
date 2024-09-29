import  {  MercadoPagoConfig ,  Payment  }  from  'mercadopago' ;
import dotenv from "dotenv";

dotenv.config();

const  client  =  new  MercadoPagoConfig ( {  accessToken : process.env.API_KEY_MP as string ,  options : {  timeout : 5000 ,  idempotencyKey : 'abc'  }  } ) ;

export const  payment  =  new  Payment ( client ) ;



