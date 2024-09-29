import { Router } from "express";
import { responseGemine } from "../controller/responseGemini";
import {responseMp} from "../controller/responseMp"

import * as every from "../controller/responseGpt";


const router = Router();

router.post('/open',every.responseGpt );
router.post('/gemine', responseGemine);
router.post('/mercadopago', responseMp)

router.get('/', every.teste)


export default router