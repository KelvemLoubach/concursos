import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', 
    info: {
      title: 'Api recurso do concurseiro', 
      version: '1.0.0',           
      description: 'Documentação da API utilizando Swagger',
      contact: {
        name: 'Kelvem',         
        url: 'https://concursos.onrender.com/', 
      },
    },
    servers: [
      {
        url: 'http://localhost:3030', 
        description: 'Servidor local'
      }
    ],
  },
  apis: ['./src/routers/*.ts'], 
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
