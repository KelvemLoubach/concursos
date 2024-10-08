import { JwtPayload } from 'jsonwebtoken'; 
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string; 
    }
  }
}


declare module "*.json" {
    const value: any;
    export default value;
  }
  

