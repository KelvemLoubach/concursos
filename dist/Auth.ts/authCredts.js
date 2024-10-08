"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configFirestore_1 = require("../config/configFirebase/configFirestore");
const authMiddleware = async (req, res, next) => {
    try {
        const { email } = req.body;
        const userByEmail = await configFirestore_1.firestoredataBase.collection('users')
            .where('email', '==', email)
            .get();
        for (const doc of userByEmail.docs) {
            const userData = doc.data();
            if (userData.credits > 0) {
                return next();
            }
            else {
                return res.status(403).json({ "Error auth verification": userData.credits });
            }
        }
        return res.status(404).json({ "Error auth verification": "User not found" });
    }
    catch (error) {
        return res.status(400).json({ "Error auth verification": error });
    }
};
exports.default = authMiddleware;
