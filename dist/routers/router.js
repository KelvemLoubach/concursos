"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const authFirebaseJtw_1 = __importDefault(require("../Auth.ts/authFirebaseJtw"));
const swagger_1 = __importDefault(require("../config/swagger"));
const gatwayAppmaxx_1 = __importDefault(require("../controller/gatwayAppmaxx"));
const notificationAppmaxx_1 = __importDefault(require("../controller/notificationAppmaxx"));
const notificationAppmaxx_2 = __importDefault(require("../controller/notificationAppmaxx"));
const generateResourceController_1 = require("../controller/generateResourceController");
const router = (0, express_1.Router)();
router.post("/generate-resource", authFirebaseJtw_1.default, generateResourceController_1.generateResourceController);
/**
 * @swagger
 * /generate-resource:
 *   post:
 *     summary: Cria um recurso com gpt
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Recurso
 *     description: Criar um recurso com gpt.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bancaConcurso:
 *                 type: string
 *                 description: Banca do concurso
 *                 example: "Selecon"
 *               tipoRecurso:
 *                 type: string
 *                 description: Anular ou mudar gabarito.
 *                 example: "Anular"
 *               candidateName:
 *                 type: string
 *                 description: Nome do candidato.
 *                 example: "kelvem"
 *               cargo:
 *                 type: string
 *                 description: Qual cargo .
 *                 example: "Policia"
 *               email:
 *                 type: string
 *                 description: E-mail do canditado.
 *                 example: "jailsondionisio@hotmail.com"
 *               inscricao:
 *                 type: number
 *                 description: Número da inscrição do canditado
 *                 example: 65465
 *               numeroQuestao:
 *                 type: number
 *                 description: Qual o número da questão .
 *                 example: 25
 *               questionContent:
 *                 type: string
 *                 description: Questão para gerar o recuso
 *                 example: Qual a capital do Brasil
 *               gabaritoInformado:
 *                 type: string
 *                 description: Gabarito da banca.
 *                 example: "D"
 *               gabaritoCandidato:
 *                 type: string
 *                 description: Gabarito considerado correto pelo canditado.
 *                 example: "C"
 *     responses:
 *       200:
 *         description: Recurso gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 responseText:
 *                   type: string
 *                   description: A resposta gerada
 *                 text:
 *                   type: string
 *                   description: Recurso gerado.
 *                   example: "Recurso gerado"
 *       500:
 *         description: Erro ao processar a solicitação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro.
 *                   example: "Erro ao Erro ao gerar o recurso."
 */
router.post("/responseNotificationAppmax", notificationAppmaxx_1.default);
router.post("/appmaxx", gatwayAppmaxx_1.default);
/**
 * @swagger
 * /appmaxx:
 *   post:
 *     summary: Cria um pagamento e retorna os detalhes da ordem Pix.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Pagamento
 *     description: Cria uma transação de pagamento e retorna o status e os detalhes da ordem Pix.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: Primeiro nome do cliente.
 *                 example: "Kelvem"
 *               lastname:
 *                 type: string
 *                 description: Sobrenome do cliente.
 *                 example: "Loubach"
 *               email:
 *                 type: string
 *                 description: E-mail do cliente.
 *                 example: "kelvem@exame.com"
 *               telephone:
 *                 type: string
 *                 description: Número de telefone do cliente.
 *                 example: "11111111111"
 *               total:
 *                 type: number
 *                 description: Valor total do pedido.
 *                 example: 750.00
 *               sku:
 *                 type: string
 *                 description: SKU (identificador) do produto.
 *                 example: "123456"
 *               name:
 *                 type: string
 *                 description: Nome do produto.
 *                 example: "Produto de Exemplo"
 *               qty:
 *                 type: number
 *                 description: Quantidade do produto.
 *                 example: 2
 *               document_number:
 *                 type: string
 *                 description: Número do documento do cliente.
 *                 example: "99999999999"
 *               expiration_date:
 *                 type: string
 *                 description: Data de expiração do pagamento.
 *                 example: "2023-12-31 23:59:59"
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
 *                   description: Mensagem de erro.
 *                   example: "Erro ao processar a solicitação"
 */
router.post("/notification", notificationAppmaxx_2.default);
router.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
exports.default = router;
