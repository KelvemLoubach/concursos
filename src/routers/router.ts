import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import verifyFirebaseToken from "../Auth.ts/authFirebaseJtw"
import swaggerDocs from "../config/swagger";
import gatwayAppmaxx from "../controller/gatwayAppmaxx";
import responseNotificationAppmax from "../controller/notificationAppmaxx";
import notificationAppMaxx from "../controller/notificationAppmaxx";
import { generateResourceController } from "../controller/generateResourceController";
import appCheckVerification from "../middleware/appCheckVerification";

const router = Router();

router.post("/generate-resource", verifyFirebaseToken, generateResourceController);

router.post("/responseNotificationAppmax", responseNotificationAppmax);

router.post("/appmaxx", gatwayAppmaxx);
router.post("/notification", notificationAppMaxx);

/**
 * @swagger
 * /appmaxx:
 *   post:
 *     summary: Cria um pagamento e retorna os detalhes da ordem Pix.
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

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
