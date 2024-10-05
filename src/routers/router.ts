import { Router } from "express";
import { responseGemine } from "../controller/responseGemini";
import authMiddleware from "../Auth.ts/authCredts";
import {responseMp} from "../controller/responseMp";
import {responseGpt} from "../controller/responseGpt"
import responseNotificationMp from "../controller/notificationMp";

const router = Router();

router.post('/gemine', responseGemine);
router.post('/responseresource',authMiddleware,responseGpt )
router.post('/mercadopago', responseMp);
router.post('/notificationMp',responseNotificationMp )

export default router