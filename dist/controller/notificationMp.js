"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseNotificationMp = async (req, res) => {
    try {
        const dados = req.body;
        console.log(dados);
        console.log('******************************************');
        console.dir(dados);
        console.log('******************************************');
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};
exports.default = responseNotificationMp;
