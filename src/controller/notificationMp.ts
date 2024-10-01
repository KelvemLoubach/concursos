import { Request, Response } from "express"
import { json } from "stream/consumers";

const responseNotificationMp = async (req: Request, res: Response):Promise<any> => {
    try {
         const { id, type } = req.body;;

         console.log(id); 
         console.log('******************************************')
         console.dir(type);
         console.log('******************************************')
       




    } catch (error) {

        return res.status(400).json({ error })
    }
}

export default responseNotificationMp;