"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseNotificationMp = async (req, res) => {
    try {
        const dadosResponse = req.body;
        return res.status(200).json({ dadosResponse });
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};
exports.default = responseNotificationMp;
