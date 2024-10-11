"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const compareSha256 = async (xSignature, dataID, xRequestId) => {
    try {
        const parts = xSignature.split(",");
        let ts;
        let hash;
        parts.forEach((part) => {
            const [key, value] = part.split("=");
            if (key && value) {
                const trimmedKey = key.trim();
                const trimmedValue = value.trim();
                if (trimmedKey === "ts") {
                    ts = trimmedValue;
                }
                else if (trimmedKey === "v1") {
                    hash = trimmedValue;
                }
            }
        });
        const secret = process.env.SECRET_KEY_MP;
        const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;
        const hmac = crypto_1.default.createHmac("sha256", secret);
        hmac.update(manifest);
        const sha = hmac.digest("hex");
        if (sha === hash) {
            console.log("HMAC verification passed");
        }
        else {
            console.log("HMAC verification failed");
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.default = compareSha256;
