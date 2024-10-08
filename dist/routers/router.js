"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("../config/swagger"));
const responseGemini_1 = require("../controller/responseGemini");
const authCredts_1 = __importDefault(require("../Auth.ts/authCredts"));
const authFirebaseJtw_1 = __importDefault(require("../Auth.ts/authFirebaseJtw"));
const testeJwt_1 = __importDefault(require("../controller/testeJwt"));
const gatwayAppmaxx_1 = __importDefault(require("../controller/gatwayAppmaxx"));
const responseGpt_1 = require("../controller/responseGpt");
const notificationMp_1 = __importDefault(require("../controller/notificationMp"));
const router = (0, express_1.Router)();
router.post('/gemine', responseGemini_1.responseGemine);
/**
 * @swagger
 * /gemine:
 *   post:
 *     summary: Retorna uma mensagem processada pelo gemini
 *     responses:
 *       200:
 *         description: Mensagem de texto processada pelo gemini
 *       500:
 *         description: Erro ao processar a solicitação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 "Erro ao processar a solicitação":
 *                   type: string
 *                   description: Mensagem de erro descrevendo o problema
 *                 error:
 *                   type: string
 *                   description: Detalhes sobre o erro que ocorreu
 */
router.post('/responseresource', authCredts_1.default, responseGpt_1.responseGpt);
router.post('/appmaxx', gatwayAppmaxx_1.default);
router.post('/notificationMp', notificationMp_1.default);
router.get('/testeJwt', authFirebaseJtw_1.default, testeJwt_1.default);
router.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
exports.default = router;
