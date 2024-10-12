import { DecodedIdToken} from 'firebase-admin/auth';

declare global {
  namespace Express {
    interface Request  {
      user?: DecodedIdToken | string; // Adicionando a propriedade user com o tipo DecodedIdToken
    }
  }
}


declare module "*.json" {
    const value: any;
    export default value;
  }
  

