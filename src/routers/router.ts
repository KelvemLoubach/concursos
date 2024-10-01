import { Router } from "express";
import { responseGemine } from "../controller/responseGemini";
import {responseMp} from "../controller/responseMp"
import responseNotificationMp from "../controller/notificationMp"

import * as every from "../controller/responseGpt";


const router = Router();

router.post('/open',every.responseGpt );
router.post('/gemine', responseGemine);
router.post('/mercadopago', responseMp);
router.post('/notificationMp',responseNotificationMp )


router.get('/', every.teste)


export default router