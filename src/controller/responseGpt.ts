import {openai} from "../configOpenAi/openAi";
import { Request, Response } from "express";

export const responseGpt = async (req:Request, res:Response ): Promise<any> => {

    try {

        // const dataForResource = req.body;

        // const completion = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: [
        //         { "role": "user", "content": "write a haiku about ai" }
        //     ]
        // });

        return res.status(200).json({"OK":"OK"}) 
        
    
    } catch (error) {

        console.error("Erro em controller: " + error);
        return error;
    }
};

export default responseGpt;