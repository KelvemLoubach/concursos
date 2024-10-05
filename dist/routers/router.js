"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const responseGemini_1 = require("../controller/responseGemini");
const authCredts_1 = __importDefault(require("../Auth.ts/authCredts"));
const responseMp_1 = require("../controller/responseMp");
const responseGpt_1 = require("../controller/responseGpt");
const notificationMp_1 = __importDefault(require("../controller/notificationMp"));
const router = (0, express_1.Router)();
router.post('/gemine', responseGemini_1.responseGemine);
router.post('/responseresource', authCredts_1.default, responseGpt_1.responseGpt);
router.post('/mercadopago', responseMp_1.responseMp);
router.post('/notificationMp', notificationMp_1.default);
exports.default = router;
