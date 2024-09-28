import express from 'express';
import  router  from './routers/router';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const server = express();

server.use(express.urlencoded({ extended: true }));


server.use(cors());

server.use(router);

server.listen(process.env.PORT);
console.log(`Rodando na porta: ${process.env.PORT}`); 