"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseNotificationMp = (req, res) => {
    try {
        const dadosResponse = req.body;
        console.log(`Resposta notificação mp ${dadosResponse}`);
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = responseNotificationMp;
