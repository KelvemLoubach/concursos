import { generateOpenAICompletion } from "../helpers/openaiHelper";
import decrementCredtByEmailUser from "../services/decrementCreditsFirebase"
import { Request, Response } from "express";

const generateResourceService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      bancaConcurso,
      tipoRecurso,
      candidateName,
      cargo,
      email,
      inscricao,
      numeroQuestao,
      questionContent,
      gabaritoInformado,
    } = req.body;

    const prompt = `
      Você é um especialista em elaborar recursos formais e técnicos para questões de concursos públicos no Brasil. Sua tarefa é analisar questões objetivas e discursivas de forma crítica, identificando erros ou inconsistências nas alternativas e apresentando argumentos sólidos para a anulação ou revisão. Você deve interpretar corretamente o tema principal da questão (por exemplo, parônimos em Língua Portuguesa, jurisprudência em Direito, etc.) e fornecer respostas formais, respeitosas e embasadas em dados precisos. Sempre que possível, utilize referências legais, doutrinárias ou gramaticais relevantes. Evite especulações e mantenha um tom neutro e técnico. As respostas devem seguir o padrão de formatação exigido pela banca ${bancaConcurso}, sem incluir informações desnecessárias como data ou local.
      
      Gerar um recurso formal para a questão do concurso conforme as informações abaixo:

      - Solicitação: ${tipoRecurso}
      **Dados do Candidato:**
      - Concurso: ${cargo}
      - Banca Examinadora: ${bancaConcurso}
      - Nome: ${candidateName}
      - Inscrição: ${inscricao}

      **Questão ${numeroQuestao}:**
      ${questionContent}

      **Gabarito Informado pela banca:** ${gabaritoInformado}

      **Instruções para a Análise:**
      1. Analise detalhadamente o enunciado e as alternativas da questão. Caso seja pertinente, utilize trechos extraídos da legislação, normas aplicáveis ou fontes confiáveis, como gramáticas renomadas, jurisprudência ou doutrina.
      2. Justifique claramente o motivo pelo qual a alternativa correta está incorreta ou porque uma outra alternativa deveria ser considerada correta, evitando respostas vagas ou excessivamente subjetivas.
      3. Certifique-se de que sua explicação seja clara, lógica e fácil de seguir, utilizando argumentos embasados e técnicos. Sempre que possível, faça referência a artigos de lei, súmulas, doutrinas, ou regras gramaticais aplicáveis.
      4. Em questões de Matemática ou Raciocínio Lógico, **explique o raciocínio passo a passo de maneira textual**, sem o uso de fórmulas ou expressões matemáticas complexas. A explicação deve ser clara o suficiente para que tanto o candidato quanto o examinador possam compreender o raciocínio apenas pela leitura do texto. Evite o uso de frações, símbolos ou equações, descrevendo os passos da resolução em formato narrativo.
      5. Evite a inclusão de informações não solicitadas ou irrelevantes. Mantenha o foco na clareza e no rigor técnico da análise.
    `;

    const responseText = await generateOpenAICompletion(prompt);

    if(responseText){
     await decrementCredtByEmailUser(email)
    }
    
    console.log(responseText);

    res.status(200).json({ "Recurso gerado": responseText });
  } catch (error) {
    console.error("Erro no serviço generateResource: " + error);
    res.status(500).json({ error: "Erro ao gerar o recurso." });
  }
};

export default generateResourceService;
