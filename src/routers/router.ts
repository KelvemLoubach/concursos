import { Router } from "express";
import * as every from "../controller/responseGpt";


const router = Router();

router.post('/recursos',every.responseGpt );

router.get('/', every.teste)


export default router