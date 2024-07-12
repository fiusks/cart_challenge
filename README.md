<h1 align="center">
     <a href="https://mydindin.netlify.app/" alt="site do ecoleta"> Ecommerce Básico </a>
</h1>

<p align="center">
  <img alt="typescript logo" src="https://img.shields.io/badge/-TypeScript-grey?style=flat-square&logo=typescript">
  <img alt="node logo" src="https://img.shields.io/badge/-Nodejs-grey?style=flat-square&logo=Node.js">
  <img alt="postgresql logo" src="https://img.shields.io/badge/-PostgreSQL-grey?style=flat-square&logo=postgresql">    
  <img alt="prisma logo" src="https://img.shields.io/badge/-Prisma-grey?style=flat-square&logo=prisma">   
</p>

## Sobre o projeto

O projeto foi desenvolvido como solução de um desafio técnico que contempla a implementações de um carrinho tanto no backend quanto no frontend
---

#### Rodando o projeto

Para rodar o projeto, é necessário ter o docker instaldo para criar as instâncias do Postgres e do Redis.

Todo o processo de desenvolvimento foi feito utilizando o Node v20.14.0

As envs utilizadas no projeto e no docker podem ser encontradas no .env.example, sendo necessário criar seu próprio arquivo .env.

- Backend

Para executar o código, será necessario abrir o terminal na pasta do backend.

```bash

# Migrar para a pasta backend

# Instale as dependências
$ yarn install

# Criar um banco do postgres no docker
$ docker compose up -d

# Configurar as variáveis de ambiente nos arquivos .env
## A referência de como preencher está no ./env.example

# Rodar o prisma para criar o banco de dados e gerar as tabelas
$ npx run prisma migrate dev

# Rodar o projeto backend
$ yarn start:dev

# O servidor inciará na porta:3000

```

---

- FrontEnd

Para executar o código, será necessario abrir o terminal na pasta do frontend

```bash
# Migrar para a pasta backend

# Instale as dependências
$ yarn install

# Rodar o projeto
$ yarn dev

# O servidor inciará na porta:3001 - acesse http://localhost:3001

```

---
