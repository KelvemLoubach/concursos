import updtadeCredtUser from "../services/updateCredtsFirebase";
import { payment } from "../configMp/pagamentMp";

const handlePayment = async (paymentId: any) => {
    try {
      const paymentData = await payment.get({id:paymentId});
  
      const status = paymentData.status;
      console.log(`Status do pagamento: ${status}`);
  
      if (status === 'approved') {
        updtadeCredtUser('jailsondpd@gmail.com',1)
        console.log('Pagamento aprovado');
  
      } else if (status === 'pending') {
        console.log('Pagamento pendente');
  
      } else if (status === 'rejected') {
        console.log('Pagamento rejeitado');
  
      }
    } catch (error) {
      console.error('Erro ao verificar o pagamento:', error);
    }
  };

  export default handlePayment;