# Usar uma imagem base do Node.js 20
FROM node:20

# Definir o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código do aplicativo
COPY . .

# Construir o aplicativo TypeScript
RUN npm run build

# Expor a porta que o aplicativo usará
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["node", "dist/server.js"]

