"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configFirestore_1 = require("../config/configFirebase/configFirestore");
const firestore_1 = require("firebase-admin/firestore");
const updatCredtByEmailUser = async (email, newCredits) => {
    try {
        // Verificação simples para garantir que o e-mail e os créditos são válidos
        if (!email || typeof email !== 'string' || email.trim() === '') {
            console.error('E-mail inválido fornecido.');
            return;
        }
        if (!newCredits || typeof newCredits !== 'number' || newCredits <= 0) {
            console.error('Valor de crédito inválido fornecido.');
            return;
        }
        // Busca usuários pelo e-mail
        const userByEmail = await configFirestore_1.firestoredataBase.collection('users')
            .where('email', '==', email)
            .get();
        // Se nenhum usuário for encontrado, retorna
        if (userByEmail.empty) {
            console.log('Nenhum usuário encontrado com o e-mail fornecido.');
            return;
        }
        // Atualiza os créditos de cada usuário encontrado de forma paralela
        const updatePromises = userByEmail.docs.map(async (doc) => {
            try {
                await configFirestore_1.firestoredataBase.collection('users').doc(doc.id).update({
                    creditQuestion: firestore_1.FieldValue.increment(newCredits) // Incrementa os créditos
                });
                console.log(`Créditos atualizados para o usuário com o e-mail: ${email}`);
                console.log(`Usuário encontrado: ${doc.id} =>`, doc.data());
            }
            catch (updateError) {
                console.error(`Erro ao atualizar os créditos para o usuário ${doc.id}:`, updateError);
            }
        });
        // Aguarda a conclusão de todas as atualizações
        await Promise.all(updatePromises);
    }
    catch (error) {
        console.error('Erro ao buscar o usuário ou atualizar créditos:', error);
    }
};
exports.default = updatCredtByEmailUser;
