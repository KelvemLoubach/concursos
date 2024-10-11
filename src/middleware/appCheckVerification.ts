import admin from "../firebase/firebaseAdmin";
import { Request, Response, NextFunction } from "express";

// Middleware para verificar o token do Firebase App Check
const appCheckVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Obtém o token do cabeçalho 'X-Firebase-AppCheck'
  const appCheckToken = req.header("X-Firebase-AppCheck");

  // Verifica se o token foi fornecido
  if (!appCheckToken) {
    res.status(401).json({ error: "Token de App Check não fornecido." });
    return;
  }

  try {
    // Verifica o token com Firebase App Check
    const appCheckClaims = await admin.appCheck().verifyToken(appCheckToken);

    // Verifique a audiência do token
    const expectedAudience = `projects/${process.env.FIREBASE_PROJECT_ID}`; // Certifique-se de definir essa variável de ambiente

    if (appCheckClaims.appId !== expectedAudience) {
      res
        .status(401)
        .json({ error: "Token de App Check inválido: audiência incorreta." });
      return;
    }

    // Armazena as informações do App Check para uso posterior
    (req as any).appCheckClaims = appCheckClaims;

    // Se a verificação do token for bem-sucedida, chama o próximo middleware
    next();
  } catch (err) {
    console.error("Erro ao verificar o token do App Check:", err);
    res.status(401).json({ error: "Token de App Check inválido." });
  }
};

export default appCheckVerification;
