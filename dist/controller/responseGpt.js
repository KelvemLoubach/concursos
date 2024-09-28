"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teste = exports.responseGpt = void 0;
const openAi_1 = require("../configOpenAi/openAi");
const responseGpt = async (req, res) => {
    const dados = req.body;
    const { Authorization } = req.headers;
    try {
        const completion = await openAi_1.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "user", "content": "write a haiku about ai" }
            ]
        });
        return res.status(200).json(completion);
    }
    catch (error) {
        console.error("Erro em controller: " + error);
        return res.status(500).send("Erro ao processar a solicitação.");
    }
};
exports.responseGpt = responseGpt;
const teste = async (req, res) => {
    return res.status(500).send("top");
};
exports.teste = teste;
