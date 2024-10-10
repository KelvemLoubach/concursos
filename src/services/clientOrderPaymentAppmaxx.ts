import axios from 'axios';
import dotenv from 'dotenv';
import {dataAppmaxx} from '..//interfaces/dataForAppmaxx'

dotenv.config();

const tokenProducao = process.env.APPMAX_ACESS_TOKEN_PRODUCAO as string;

export const creatClientId = async (dataClient:dataAppmaxx) =>{

  try {

    const response = await axios.post('https://admin.appmax.com.br/api/v3/customer', {

      "access-token":tokenProducao,
      "firstname":dataClient.firstname,
      "lastname":dataClient.lastname,
      "email":dataClient.email,
      "telephone":dataClient.telephone,
      
  });

  console.log( 'tipo id cliente na requisição ' + typeof response.data.data.id)

  return response.data.data.id

  } catch (error) {

  
    return error;
    
  }

}

export const createOrderId = async (clientId:number,total:number,qty:number ) =>{

try {

const response = await axios.post('https://admin.appmax.com.br/api/v3/order', {

  "access-token":tokenProducao,
     "total":total,
     "products": [
       {
           "sku":"123123",
           "name":"My product 1",
           "qty":qty
       }
     ],
     "customer_id":clientId,
});

console.log('Order id' + response.data.data.id)
console.log('Order id tipo ' + typeof response.data.data.id)
return response.data.data.id;
  
} catch (error) {


return error;
  
}
}


export const creatPayment = async (clienteId:number, orderId:number,document_number:string, expiration_data:string) =>{


try {

const response = await axios.post('https://admin.appmax.com.br/api/v3/payment/pix', {

  "access-token":tokenProducao,
  "cart":
  {
        "order_id":orderId
  },
  "customer":
  {
        "customer_id":clienteId
  },
  "payment":
  {
        "pix":
        {
              "document_number":document_number,
              "expiration_date":expiration_data,
        }
  }

});

return response.data;


} catch (error) {

console.log(`Erros em criar pagamento ${error}`)
return error;
  
}


}


