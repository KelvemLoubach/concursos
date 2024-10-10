"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseGpt = void 0;
const openAi_1 = require("../config/configOpenAi/openAi");
const responseGpt = async (req, res) => {
    try {
        const dataForResource = req.body;
        const completion = await openAi_1.openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `Você é um especialista em elaborar recursos formais e técnicos para questões de concursos públicos no Brasil. Sua tarefa é analisar questões objetivas e discursivas de forma crítica, identificando erros ou inconsistências nas alternativas e apresentando argumentos sólidos para a anulação ou revisão. Você deve interpretar corretamente o tema principal da questão (por exemplo, parônimos em Língua Portuguesa, jurisprudência em Direito, etc.) e fornecer respostas formais, respeitosas e embasadas em dados precisos. Sempre que possível, utilize referências legais, doutrinárias ou gramaticais relevantes. Evite especulações e mantenha um tom neutro e técnico. As respostas devem seguir o padrão de formatação exigido pela banca Selecon, sem incluir informações desnecessárias como data ou local.`,
                },
                {
                    role: 'user',
                    content: `Gerar um recurso formal para a questão do concurso conforme as informações abaixo: 

              - Solicitação: 65565
              **Dados do Candidato:**
              - Concurso: Policia penal de MG
              - Banca Examinadora: Selecon
              - Nome: kelvem    
              - Inscrição: 654643

              **Questão numero 29 :**

              29. Maristela, integrante do Conselho Penitenciário, é
espancada por Roberval, parente de um detento, em virtude
da função pública por ela exercida. No evento, a vítima perde a
visão de um dos olhos, mantendo-se íntegra a visão do outro. É
correto afirmar que Roberval praticou crime de:
A)	 lesão corporal gravíssima majorada
B)	 lesão corporal grave majorada
C)	 lesão corporal gravíssima
D)	 lesão corporal grave


       

              **Gabarito Informado pela banca: c ** 

              **Instruções para a Análise:**
              1. Analise detalhadamente o enunciado e as alternativas da questão. Caso seja pertinente, utilize trechos extraídos da legislação, normas aplicáveis ou fontes confiáveis, como gramáticas renomadas, jurisprudência ou doutrina.
              2. Justifique claramente o motivo pelo qual a alternativa correta está incorreta ou porque uma outra alternativa deveria ser considerada correta, evitando respostas vagas ou excessivamente subjetivas.
              3. Certifique-se de que sua explicação seja clara, lógica e fácil de seguir, utilizando argumentos embasados e técnicos. Sempre que possível, faça referência a artigos de lei, súmulas, doutrinas, ou regras gramaticais aplicáveis.
              4. Em questões de Matemática ou Raciocínio Lógico, **explique o raciocínio passo a passo de maneira textual**, sem o uso de fórmulas ou expressões matemáticas complexas. A explicação deve ser clara o suficiente para que tanto o candidato quanto o examinador possam compreender o raciocínio apenas pela leitura do texto. Evite o uso de frações, símbolos ou equações, descrevendo os passos da resolução em formato narrativo.
              5. Evite a inclusão de informações não solicitadas ou irrelevantes. Mantenha o foco na clareza e no rigor técnico da análise.
              `,
                },
            ],
            max_tokens: 3000,
            temperature: 0.1,
            top_p: 0.1
        });
        const responseText = completion.choices[0].message.content;
        console.log(responseText);
        return res.status(200).json({ "Recurso gerado": responseText });
    }
    catch (error) {
        console.error("Erro em controller: " + error);
        return error;
    }
};
exports.responseGpt = responseGpt;
exports.default = exports.responseGpt;
