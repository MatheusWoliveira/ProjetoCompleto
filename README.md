# VillaMusic

## Descrição do Projeto

VillaMusic é uma aplicação web de streaming musical desenvolvida com o objetivo de apoiar artistas independentes da cidade de Feira de Santana. O sistema tem como foco principal oferecer uma plataforma segura e acessível, permitindo o cadastro de usuários, autenticação com criptografia de senhas e validação por token JWT. Inspirado em serviços como o Spotify, o projeto busca valorizar a cena musical local, proporcionando aos artistas um ambiente digital para divulgar suas músicas de forma autônoma e profissional.

## Funcionalidades

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

## Estrutura do Projeto

Abaixo está uma visão geral da estrutura de diretórios do projeto:

ProjetoCompleto/
│
├── VillaMusic/
│   ├── app.js                  ← Arquivo principal da aplicação Express
│   ├── package.json
│   ├── .gitignore
│
│   ├── controllers/            ← Funções de lógica do sistema
│   │   ├── userController.js
│   │   └── musicController.js
│
│   ├── models/                 ← Modelos do banco de dados (Mongoose)
│   │   └── User.js
│
│   ├── routes/                 ← Rotas organizadas por assunto
│   │   ├── userRoutes.js
│   │   └── musicRoutes.js
│
│   ├── database/               ← Conexão com o MongoDB
│   │   └── index.js
│
│   ├── public/                 ← Arquivos estáticos
│   │   ├── css/
│   │   │   ├── pgCadastro.css
│   │   │   ├── loginStyle.css
│   │   │   ├── logadoStyle.css
│   │   │   └── musicas.css
│   │   ├── js/
│   │   │   ├── scriptCadastro.js
│   │   │   ├── scriptLogin.js
│   │   │   └── scriptLogado.js
│   │   └── imagens/
│   │       ├── logo.png
│   │       ├── racionais.jpg
│   │       ├── thebox.jpg
│   │       ├── passardefoguetao.jpg
│   │       └── ...
│
│   ├── views/                  ← Páginas HTML (views)
│   │   ├── cadastro/
│   │   │   └── index.html
│   │   ├── login/
│   │   │   └── pgLogin.html
│   │   ├── logado/
│   │   │   └── pgLogado.html
│   │   └── musicas/
│   │       └── musicas.html
│
└── README.md

