import adminfirebase from "firebase-admin";
const serviceAccount = require("../../../recurso.json");
import dotenv from "dotenv";

dotenv.config();

adminfirebase.initializeApp({
  credential: adminfirebase.credential.cert(serviceAccount),
  databaseURL: process.env.DATA_BASE_URL,
});

const firestoredataBase = adminfirebase.firestore();
const authFirebase = adminfirebase.auth();

export { firestoredataBase, authFirebase };
