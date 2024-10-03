"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const compareSha256 = async (xSignature, dataID, xRequestId) => {
    try {
        // Separando a assinatura (x-signature) em partes
        const parts = xSignature.split(',');
        // Inicializando variáveis para armazenar 'ts' e 'v1'
        let ts;
        let hash;
        // Iterando sobre os valores da assinatura para obter 'ts' e 'v1'
        parts.forEach((part) => {
            const [key, value] = part.split('=');
            if (key && value) {
                const trimmedKey = key.trim();
                const trimmedValue = value.trim();
                if (trimmedKey === 'ts') {
                    ts = trimmedValue;
                }
                else if (trimmedKey === 'v1') {
                    hash = trimmedValue;
                }
            }
        });
        // Obtendo a chave secreta do Mercado Pago
        const secret = process.env.SECRET_KEY_MP; // Substitua pela sua chave secreta real
        // Gerando o manifesto
        const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;
        // Criando a assinatura HMAC usando SHA-256 e a chave secreta
        const hmac = crypto_1.default.createHmac('sha256', secret);
        hmac.update(manifest);
        // Obtendo o hash resultante em formato hexadecimal
        const sha = hmac.digest('hex');
        // Comparando o hash gerado com o 'v1' fornecido no cabeçalho
        if (sha === hash) {
            // Verificação HMAC bem-sucedida
            console.log('HMAC verification passed');
        }
        else {
            // Verificação HMAC falhou
            console.log('HMAC verification failed');
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = compareSha256;
