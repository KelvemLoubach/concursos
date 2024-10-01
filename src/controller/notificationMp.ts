import { Request, Response } from "express"
import { json } from "stream/consumers";

const responseNotificationMp = async (req: Request, res: Response):Promise<any> => {
    try {
         const dados = req.body;

         console.log(dados.payment); 
         console.log('******************************************')
         console.dir(dados);
         console.log('******************************************')
       




    } catch (error) {

        return res.status(400).json({ error })
    }
}

export default responseNotificationMp;