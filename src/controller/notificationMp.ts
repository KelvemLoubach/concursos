import { Request, Response } from "express"


const responseNotificationMp = (req: Request, res: Response) => {
    try {
        const dadosResponse = req.body;


        console.log(`Resposta notificação mp ${dadosResponse}`)



    } catch (error) {


        console.log(error)




    }






}

export default responseNotificationMp;