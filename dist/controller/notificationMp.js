"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseNotificationMp = async (req, res) => {
    try {
        const { id, type } = req.body;
        ;
        console.log(id);
        console.log('******************************************');
        console.dir(type);
        console.log('******************************************');
    }
    catch (error) {
        return res.status(400).json({ error });
    }
};
exports.default = responseNotificationMp;
