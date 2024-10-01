import { Request, Response } from "express"
import { json } from "stream/consumers";

const responseNotificationMp = async (req: Request, res: Response):Promise<any> => {
    try {
        const dadosResponse = req.params;

         console.log(JSON.stringify(dadosResponse, null, 2)); 
         console.log('******************************************')
         console.dir(dadosResponse, { depth: null });
         console.log('******************************************')
         console.log(dadosResponse);




    } catch (error) {

        return res.status(400).json({ error })
    }
}

export default responseNotificationMp;