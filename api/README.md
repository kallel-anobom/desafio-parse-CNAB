# 🚀 Backend CNAB - Node.js + TypeScript + PostgreSQL

Esta API foi desenvolvida para processar e armazenar arquivos CNAB (Código Nacional de Arrecadação Bancária). Ela é construída com Node.js, Express, TypeScript e utiliza um banco de dados PostgreSQL para armazenamento.

## 🛠️ Tecnologias Utilizadas

- Node.js - Ambiente de execução JavaScript
- Express - Framework web para Node.js
- TypeScript - Superset tipado do JavaScript
- PostgreSQL - Banco de dados relacional
- typeORM - ORM para manipulação do banco de dados
- Multer - Middleware para upload de arquivos
- Docker - Containerização da aplicação

---

## 🚀 Como rodar a aplicação

#### Pré-requisitos:

- Docker
- Docker Compose
- Node.js (opcional, caso queira rodar localmente sem Docker)

### Usando Docker Compose

##### ✅ 1️⃣ Clone o repositório:

```sh
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

##### ✅ 2️⃣ Suba os contêineres com Docker Compose:

```sh
docker-compose up --build
```

**Isso irá subir três serviços:**

- API: A aplicação Node.js/Express.

- PostgreSQL: Banco de dados PostgreSQL.

- PgAdmin: Interface gráfica para gerenciar o banco de dados.

##### ✅ 3️⃣ Acesse a API:

- A API estará rodando em http://localhost:3001.

- O PgAdmin estará disponível em http://localhost:5050.

### 📝 Scripts disponíveis:

- npm run build: Compila o código TypeScript para JavaScript.

- npm run start: Inicia a aplicação a partir do código compilado.

- npm run dev: Inicia a aplicação em modo de desenvolvimento usando ts-node.

- npm run test: Executa os testes com Jest.

- npm run test:watch: Executa os testes em modo de observação.

- npm run coverage: Gera um relatório de cobertura de testes.

- npm run lint: Executa o ESLint para verificar problemas no código.

- npm run lint:fix: Executa o ESLint e corrige problemas automaticamente.

### 🌐 Endpoints da API

A API possui os seguintes endpoints:

POST /api/upload: Faz o upload de um arquivo CNAB e processa os dados.

GET /api/transactions: Retorna todas as transações processadas.

Para mais detalhes, consulte a documentação da API disponível em http://localhost:3001/api-docs (usando Swagger).
