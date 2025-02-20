# Usa a imagem do Node.js
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código para o container
COPY . .

# Expõe a porta 3000
EXPOSE 3001

# Comando para iniciar o app
CMD ["npm", "run", "dev"]
