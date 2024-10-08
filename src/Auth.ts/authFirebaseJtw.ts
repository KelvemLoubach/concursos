import { Request, Response, NextFunction } from 'express';
import { authFirebase } from "../config/configFirebase/configFirestore";

const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Token não fornecido ou inválido.');
  }

  const token = authHeader.split(' ')[1]; 

  try {
    
    const decodedToken = await authFirebase.verifyIdToken(token);
    req.user = decodedToken; 
    next(); 
  } catch (error) {
    console.error('Erro na verificação do token Firebase:', error);
    res.status(403).send('Falha na autenticação.');
  }
};

export default verifyFirebaseToken;
