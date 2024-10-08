"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configFirestore_1 = require("../config/configFirebase/configFirestore");
const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Token não fornecido ou inválido.');
    }
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = await configFirestore_1.authFirebase.verifyIdToken(token);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        console.error('Erro na verificação do token Firebase:', error);
        res.status(403).send('Falha na autenticação.');
    }
};
exports.default = verifyFirebaseToken;
