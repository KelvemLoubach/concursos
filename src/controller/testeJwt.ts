import {Request, Response} from "express";

const testeJwt = async (req:Request, res:Response): Promise<any> =>{

    const user = req.user;

    try {

        return res.status(200).json({"User autorizado":user})
        
    } catch (error) {

       return res.status(400).json({"Erro na rota teste Jwt":error})
        
    }



}
export default testeJwt;