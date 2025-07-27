const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./database');

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

// HABILITAR CORS PARA O FRONTEND RODANDO EM http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, '../FRONT/views/public')));
app.use(express.static(path.join(__dirname, '../FRONT/views')));

// Rotas da API
app.use('/api', userRoutes);

// Página inicial (login)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONT/views/login/pgLogin.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
