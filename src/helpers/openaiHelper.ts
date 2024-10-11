import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";

export const generateOpenAICompletion = async (prompt: string) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY as string}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: prompt,
          },
        ],
        max_tokens: 3000,
        temperature: 0.1,
        top_p: 0.1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro na resposta da API da OpenAI:", errorData);
      throw new Error(`Erro ao chamar a API da OpenAI: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao chamar a API da OpenAI: ", error);
    throw new Error("Erro ao gerar o recurso com a OpenAI.");
  }
};
