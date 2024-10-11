import { Request, Response, NextFunction } from "express";
import { authFirebase } from "../config/configFirebase/configFirestore";

// Middleware para verificar o token do Firebase
const verifyFirebaseToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Verifica se o cabeçalho de autorização existe e tem o formato correto
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Token não fornecido ou inválido. O formato esperado é: 'Bearer <token>'.",
      });
    }

    // Extrai o token do cabeçalho de autorização
    const token = authHeader.split(" ")[1];

    // Verifica se o token foi extraído corretamente
    if (!token) {
      return res.status(401).json({
        error: "Token não encontrado no cabeçalho 'Authorization'.",
      });
    }

    // Tenta verificar e decodificar o token do Firebase
    const decodedToken = await authFirebase.verifyIdToken(token);

    // Verifica se o token foi decodificado com sucesso
    if (!decodedToken) {
      return res.status(401).json({
        error: "Falha na decodificação do token.",
      });
    }

    // Adiciona as informações do usuário no objeto `req` para uso posterior
    (req as any).user = decodedToken;

    // Continua para o próximo middleware
    next();
  } catch (error: any) {
    // Tratamento detalhado de erros
    if (error.code === "auth/argument-error") {
      return res.status(400).json({
        error: "Token fornecido é inválido.",
        details: error.message,
      });
    }

    if (error.code === "auth/id-token-expired") {
      return res.status(403).json({
        error: "Token expirado. Faça login novamente.",
      });
    }

    if (error.code === "auth/id-token-revoked") {
      return res.status(403).json({
        error: "Token foi revogado. Faça login novamente.",
      });
    }

    // Captura outros tipos de erro e retorna uma resposta padrão
    console.error("Erro na verificação do token Firebase:", error);
    return res.status(500).json({
      error: "Falha interna ao verificar o token Firebase.",
      details: error.message || "Erro desconhecido",
    });
  }
};

export default verifyFirebaseToken;
