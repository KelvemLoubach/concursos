import { Request, Response } from "express"
import { json } from "stream/consumers";

const responseNotificationMp = async (req: Request, res: Response):Promise<any> => {
    try {
        const dadosResponse = req.body as string;

        return res.status(200).json({ dadosResponse })

    } catch (error) {

        return res.status(400).json({ error })
    }
}

export default responseNotificationMp;