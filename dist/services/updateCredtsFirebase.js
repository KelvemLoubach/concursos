"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configFirestore_1 = require("../config/configFirebase/configFirestore");
const firestore_1 = require("firebase-admin/firestore");
const updatCredtByEmailUser = async (email, newCredits) => {
    try {
        const userByEmail = await configFirestore_1.firestoredataBase.collection('users')
            .where('email', '==', email)
            .get();
        if (userByEmail.empty) {
            console.log('Nenhum usuário encontrado com o e-mail fornecido.');
            return;
        }
        userByEmail.forEach(async (doc) => {
            await configFirestore_1.firestoredataBase.collection('users').doc(doc.id).update({
                creditQuestion: firestore_1.FieldValue.increment(newCredits)
            });
            console.log(`Créditos atualizados para o usuário com o e-mail: ${email}`);
            console.log(`Usuário encontrado: ${doc.id} =>`, doc.data());
        });
        return;
    }
    catch (error) {
        console.error('Erro ao buscar o usuário:', error);
    }
};
exports.default = updatCredtByEmailUser;
