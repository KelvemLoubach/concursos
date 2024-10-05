"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseGpt = void 0;
const openAi_1 = require("../configOpenAi/openAi");
const responseGpt = async (dataForGpt) => {
    try {
        const completion = await openAi_1.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "user", "content": "write a haiku about ai" }
            ]
        });
        return completion;
    }
    catch (error) {
        console.error("Erro em controller: " + error);
        return error;
    }
};
exports.responseGpt = responseGpt;
exports.default = exports.responseGpt;
