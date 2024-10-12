"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configFirestore_1 = require("../config/configFirebase/configFirestore");
const verifyFirebaseToken = async (req, res, next) => {
    try {
        // Obtém o token do cabeçalho de autorização (formato "Bearer <token>")
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token não fornecido ou inválido." });
        }
        // Extrai o token da string "Bearer <token>"
        const idToken = authHeader.split(" ")[1];
        // Verifica o token de ID fornecido pelo cliente
        const decodedToken = await configFirestore_1.authFirebase.verifyIdToken(idToken);
        // Verifica se o token tem um UID válido
        if (!decodedToken.uid) {
            return res.status(403).json({ error: "Token inválido." });
        }
        console.log("Token verificado com sucesso, UID do usuário:", decodedToken.uid);
        // Continua para o próximo middleware ou rota
        next();
    }
    catch (error) {
        console.error("Erro ao verificar o token:", error);
        return res.status(403).json({ error: "Falha na autenticação. Token inválido ou expirado." });
    }
};
exports.default = verifyFirebaseToken;
