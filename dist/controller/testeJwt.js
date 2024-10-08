"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testeJwt = async (req, res) => {
    const user = req.user;
    try {
        return res.status(200).json({ "User autorizado": user });
    }
    catch (error) {
        return res.status(400).json({ "Erro na rota teste Jwt": error });
    }
};
exports.default = testeJwt;
