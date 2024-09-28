import {openai} from "../configOpenAi/openAi";
import { Request, Response } from "express";

export const responseGpt = async (req: Request, res: Response): Promise<any> => {

    const dados = req.body;
    const { Authorization } = req.headers

    try {


        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "user", "content": "write a haiku about ai" }
            ]
        });

        return res.status(200).json(completion)

    } catch (error) {

        console.error("Erro em controller: " + error);
        return res.status(500).send("Erro ao processar a solicitação.");
    }
};


export const teste = async (req: Request, res: Response): Promise<any> => {

    return res.status(500).send("top");
}