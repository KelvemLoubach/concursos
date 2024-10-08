"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseGemine = void 0;
const gemini_1 = __importDefault(require("../config/configGemini/gemini"));
const responseGemine = async (req, res) => {
    const dados = req.body;
    try {
        const prompt = `Solicitação de Recursos para Questões de Concurso

Você é um especialista em elaborar recursos para questões de concurso, utilizando as informações a seguir:

Banca: ${dados.banca}
Concurso: ${dados.contest_name}
Disciplina: ${dados.discipline}
Tópico: ${dados.topic}
Com base nisso, eu gostaria de solicitar um recurso do tipo ${dados.type}. A alternativa que a banca definiu como correta é ${dados.bank_answer_sheet}, e estou contestando essa resposta em favor da alternativa ${dados.desired_answer}.

A questão em questão é a seguinte:

${dados.question_text}

Por favor, elabore um recurso fundamentado, destacando os argumentos que sustentam a contestação e apresentando uma análise detalhada da questão.

Responda como um professore que está se dirigindo diretamente para a banca examinadora.
        
        `;
        const result = await gemini_1.default.generateContent(prompt);
        return res.status(200).json(result.response.text());
    }
    catch (error) {
        console.error("Erro em controller: " + error);
        return res.status(500).json({ "Eroo ao processar a solicitação": error });
    }
};
exports.responseGemine = responseGemine;
