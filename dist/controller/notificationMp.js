"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseNotificationMp = async (req, res) => {
    try {
        const dadosResponse = req.body;
        console.log(JSON.stringify(dadosResponse, null, 2));
        console.log('******************************************');
        console.dir(dadosResponse, { depth: null });
        console.log('******************************************');
        console.log(dadosResponse);
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};
exports.default = responseNotificationMp;
