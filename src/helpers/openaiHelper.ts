import dotenv from "dotenv";
import { openai } from "../config/configOpenAi/openAi";

dotenv.config();

export const generateOpenAICompletion = async (prompt: string) => {

  if (!prompt || prompt.trim().length === 0) {
    console.error("Prompt está vazio ou inválido.");
    throw new Error("O prompt fornecido é inválido.");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",  
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      max_tokens: 4000,
      temperature: 0.1,
      top_p: 0.1,
    });

    // Extraindo o conteúdo da resposta
    const responseText = response.choices[0].message.content;
    
    // Verificando se há uma resposta válida
    if (!response || !response || !response.choices || response.choices.length === 0) {
      console.error("Resposta inválida da API da OpenAI.");
      throw new Error("Nenhuma resposta válida foi retornada pela OpenAI.");
    }

    console.log(responseText)
    return responseText;

  } catch (error:any) {
    if (error.response) {
      // Erro na resposta da API
      console.error("Erro na resposta da API OpenAI:", error.response.data);
    } else if (error.request) {
      // Erro na requisição para a API
      console.error("Erro na requisição à API OpenAI:", error.request);
    } else {
      // Outro tipo de erro
      console.error("Erro ao chamar a API da OpenAI:", error.message);
    }
    throw new Error("Erro ao gerar o recurso com a OpenAI.");
  }
  };

