import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const newId: string = uuidv4();

const client = new MercadoPagoConfig({ accessToken: process.env.API_KEY_MP as string, options: { timeout: 5000, idempotencyKey: newId } });

const payment = new Payment(client);
const preference = new Preference(client);

export { payment, preference} ;

