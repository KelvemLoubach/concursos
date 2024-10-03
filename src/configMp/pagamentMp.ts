import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import dotenv from "dotenv";

dotenv.config();

const client = new MercadoPagoConfig({ accessToken: process.env.API_KEY_MP as string, options: { timeout: 5000, idempotencyKey: 'kljgliugliugliglikjhgbliftlç' } });


 const payment = new Payment(client);
 const preference = new Preference(client);

export { payment, preference} ;

