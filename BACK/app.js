//BACK/app.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./database');

// Conectar ao banco
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para o front rodando em http://localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middlewares para interpretar JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, '../FRONT/views/public')));
app.use(express.static(path.join(__dirname, '../FRONT/views')));

// Rotas da API
app.use('/api', require('./routes/userRoutes'));
app.use('/api/music', require('./routes/musicRoutes'));

// Página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../FRONT/views/login/pgLogin.html'));
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});   