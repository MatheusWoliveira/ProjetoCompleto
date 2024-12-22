# MusicTuning

## Descrição do Projeto

MusicTuning é um projeto inspirado no Spotify, desenvolvido para aprimorar habilidades de desenvolvimento web. O objetivo é criar uma plataforma com funcionalidades de cadastro e autenticação de usuários, usando hashing de senha e autenticação JWT.

## Funcionalidades

- Cadastro de usuários com validação de e-mail
- Hashing de senhas para maior segurança dos dados
- Autenticação JWT para proteção de rotas
- Envio de e-mail de confirmação de cadastro (via nodemailer)
- Interface de login e redirecionamento para a página principal após a autenticação

## Tecnologias Utilizadas

- **Frontend**:
  - HTML, CSS, JavaScript
- **Backend**:
  - Node.js, Express.js
  - MongoDB para persistência de dados
- **Bibliotecas**:
  - `bcryptjs` para hashing de senha
  - `jsonwebtoken` para autenticação JWT
  - `nodemailer` para envio de e-mails de confirmação

## Estrutura do Projeto

Abaixo está uma visão geral da estrutura de diretórios do projeto:

├── database
│   └── index.js
├── models
│   └── model.js
├── web
├── cadastro
│   ├── index.html
│   ├── pgLogado.css
│   └── scriptLogado.js
├── imagens
│   ├── spotify.ico
│   ├── spotify.png
├── logado
│   ├── logadoStyle.css
│   ├── pgLogado.html
│   └── scriptLogado.js
├── login
│   ├── loginStyle.css
│   ├── pgLogin.html
│   └── scriptLogin.js
├── app.js
