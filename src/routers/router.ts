import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../config/swagger'; 
import { responseGemine } from "../controller/responseGemini";
import authMiddleware from "../Auth.ts/authCredts";
import verifyFirebaseToken from "../Auth.ts/authFirebaseJtw"
import testeJwt from "../controller/testeJwt";
import gatwayAppmaxx from "../controller/gatwayAppmaxx";
import {responseGpt} from "../controller/responseGpt";
import responseNotificationMp from "../controller/notificationMp";

const router = Router();


router.post('/gemine', responseGemine);
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

router.post('/responseresource', authMiddleware, responseGpt);

router.post('/appmaxx', gatwayAppmaxx);

router.post('/notificationMp', responseNotificationMp);

router.get('/testeJwt', verifyFirebaseToken, testeJwt);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
