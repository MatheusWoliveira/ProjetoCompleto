const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./database'); // conexão com MongoDB

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos (css, js, imagens)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Rotas da API
app.use('/api', userRoutes);

// Página inicial (login)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/login/pgLogin.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
