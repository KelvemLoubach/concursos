import {firestoredataBase} from "../config/configFirebase/configFirestore";
import { FieldValue } from 'firebase-admin/firestore';


const updatCredtByEmailUser = async (email: string, newCredits: number) => {
  try {
 
    const userByEmail = await firestoredataBase.collection('users')
    .where('email', '==', email)
      .get();
     

    if (userByEmail.empty) {
      console.log('Nenhum usuário encontrado com o e-mail fornecido.');
      return;
    }

    userByEmail.forEach(async (doc) => {
   
        await firestoredataBase.collection('users').doc(doc.id).update({
          creditQuestion: FieldValue.increment(newCredits)
        });
        console.log(`Créditos atualizados para o usuário com o e-mail: ${email}`);
        console.log(`Usuário encontrado: ${doc.id} =>`, doc.data());
      });

      return;
  } catch (error) {
    console.error('Erro ao buscar o usuário:', error);
  }
  
};


export default updatCredtByEmailUser;