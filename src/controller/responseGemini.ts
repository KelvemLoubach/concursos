import { Request, Response } from "express";
import dadosFront from "../interfaces/dadosFront"
import model from "../config/configGemini/gemini";

export const responseGemine = async (req: Request, res: Response): Promise<any> => {

    const dados = req.body as dadosFront;

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

        const result = await model.generateContent(prompt);
        return res.status(200).json(result.response.text());


    } catch (error) {

        console.error("Erro em controller: " + error);
        return res.status(500).json({"Eroo ao processar a solicitação":error});
    }
};