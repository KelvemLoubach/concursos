"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("../config/swagger"));
const responseGemini_1 = require("../controller/responseGemini");
const authFirebaseJtw_1 = __importDefault(require("../Auth.ts/authFirebaseJtw"));
const testeJwt_1 = __importDefault(require("../controller/testeJwt"));
const gatwayAppmaxx_1 = __importDefault(require("../controller/gatwayAppmaxx"));
const responseGpt_1 = require("../controller/responseGpt");
const notificationAppmaxx_1 = __importDefault(require("../controller/notificationAppmaxx"));
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
router.post('/responseresource', responseGpt_1.responseGpt);
/**
 * @swagger
 * /responseGpt:
 *   post:
 *     summary: Gera um recurso formal para uma questão de concurso público usando o GPT-4.
 *     tags:
 *       - OpenAI GPT
 *     description: Esta rota usa a API GPT-4 para gerar um recurso formal para uma questão de concurso público com base nas informações fornecidas pelo usuário.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               concurso:
 *                 type: string
 *                 description: Nome do concurso para o qual o recurso será gerado.
 *                 example: "Policia penal de MG"
 *               banca:
 *                 type: string
 *                 description: Nome da banca examinadora.
 *                 example: "Selecon"
 *               nome:
 *                 type: string
 *                 description: Nome do candidato.
 *                 example: "Kelvem"
 *               inscricao:
 *                 type: string
 *                 description: Número de inscrição do candidato.
 *                 example: "654643"
 *               questao_numero:
 *                 type: integer
 *                 description: Número da questão a ser analisada.
 *                 example: 29
 *               enunciado:
 *                 type: string
 *                 description: Enunciado da questão que será analisada.
 *                 example: "Maristela, integrante do Conselho Penitenciário, é espancada por Roberval, parente de um detento, em virtude da função pública por ela exercida..."
 *               gabarito_informado:
 *                 type: string
 *                 description: Gabarito informado pela banca.
 *                 example: "C"
 *               instrucao_analise:
 *                 type: string
 *                 description: Instruções para a análise do recurso.
 *                 example: "Justifique claramente o motivo pelo qual a alternativa correta está incorreta..."
 *     responses:
 *       200:
 *         description: Recurso gerado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Recurso gerado:
 *                   type: string
 *                   description: Recurso gerado para a questão do concurso.
 *                   example: "O enunciado da questão trata de uma lesão corporal gravíssima..."
 *       400:
 *         description: Erro ao processar a solicitação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro.
 *                   example: "Erro em controller: Ocorreu um erro ao gerar o recurso."
 */
router.post('/appmaxx', gatwayAppmaxx_1.default);
/**
 * @swagger
 * /api/payment:
 *   post:
 *     summary: Processa um pagamento e retorna os detalhes da transação Pix.
 *     tags:
 *       - Pagamento
 *     description: Processa uma transação de pagamento e retorna o status e os detalhes da transação Pix.
 *     responses:
 *       200:
 *         description: Transação efetuada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: O status da transação (ativo, cancelado, etc.)
 *                   example: "ATIVA"
 *                 text:
 *                   type: string
 *                   description: Mensagem de sucesso ou falha da transação.
 *                   example: "Transação efetuada com sucesso"
 *                 data:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       description: O método de pagamento usado (ex: Pix).
 *                       example: "Pix"
 *                     pay_reference:
 *                       type: string
 *                       description: Referência da transação de pagamento.
 *                       example: "75237240c685efbce8..."
 *                     pix_qrcode:
 *                       type: string
 *                       description: QR code gerado para pagamento via Pix.
 *                       example: "iVBORw0KGgoAAAANSUhEUgA..."
 *                     pix_emv:
 *                       type: string
 *                       description: Código EMV (informações do Pix) para a transação.
 *                       example: "0002010102122677700148BR..."
 *                     pix_creation_date:
 *                       type: string
 *                       description: Data de criação da transação Pix.
 *                       example: "2024-10-09 20:15:48"
 *                     pix_expiration_date:
 *                       type: string
 *                       description: Data de expiração da transação Pix.
 *                       example: "2024-10-11 12:00:00"
 *                 status:
 *                   type: integer
 *                   description: Status HTTP da transação.
 *                   example: 200
 *       400:
 *         description: Erro ao processar a solicitação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: "Erro ao processar a solicitação"
 */
router.post('/notificationAp', notificationAppmaxx_1.default);
/**
 * @swagger
 * /notificationAp:
 *   post:
 *     summary: Recebe a notificação do webhook appmaxx, verifica se está aprovado e atualiza os créditos no firebase
 *     responses:
 *       200:
 *         description: Void
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
router.get('/testeJwt', authFirebaseJtw_1.default, testeJwt_1.default);
/**
 * @swagger
 * /testeJwt:
 *   get:
 *     summary: Verifica o token JWT e retorna as informações do usuário autorizado.
 *     tags:
 *       - Autenticação
 *     security:
 *       - bearerAuth: []
 *     description: Rota que verifica um token JWT e retorna as informações do usuário autorizado caso o token seja válido.
 *     responses:
 *       200:
 *         description: Token JWT verificado com sucesso, retorna o usuário autorizado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 "User autorizado":
 *                   type: object
 *                   description: Informações sobre o usuário autenticado.
 *                   example: {
 *                     "id": "123456789",
 *                     "email": "user@e.com",
 *                     "name": "User Name"
 *                   }
 *       400:
 *         description: Ocorreu um erro na verificação do token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 "Erro na rota teste Jwt":
 *                   type: string
 *                   description: Mensagem de erro caso o token JWT seja inválido ou não autorizado.
 *                   example: "Token inválido ou erro de autenticação."
 */
router.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
exports.default = router;
