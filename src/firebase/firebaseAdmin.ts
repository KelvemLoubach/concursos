import dotenv from "dotenv";
import admin from "firebase-admin";

// Carregar variáveis do arquivo .env
dotenv.config();

// Inicializar o Firebase Admin SDK com a chave do serviço
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}"
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
