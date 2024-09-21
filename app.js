// app.js
const express = require('express');
const connectDB = require('./database'); 
const bcrypt = require('bcryptjs'); // Biblioteca para hashing(modo grosseiro: embaralhamento de senhas) de senhas
const jwt = require('jsonwebtoken'); //Biblioteca para geração de tokens JWT
const User = require('./models/model'); 
const path = require('path'); 

const app = express();
connectDB();

app.use(express.json()); // Middleware para permitir a aplicação lidar com dados em JSON
app.use(express.static(path.join(__dirname, 'web')));// Middleware para servir arquivos estáticos (como HTML, CSS, JS)

// Rota para registro de usuário
app.post('/api/register', async (req, res) => {
    const { nome, email, senha, telefone } = req.body;

    try {
        // Aqui está sendo feita a verificação de usuário com o email fornecido
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Este email já está sendo usado' });
        }

        user = new User({
            nome,
            email,
            senha,
            telefone
        });

        // gerando um salt para hashing da senha
        const salt = await bcrypt.genSalt(10);
        // Hashing da senha gerado
        user.senha = await bcrypt.hash(senha, salt);

        await user.save();
        console.log('Usuário registrado com sucesso:', user);
        res.json({ msg: 'Você se cadastrou com sucesso !!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para login de usuário
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(400).json({ msg: 'Usuário não encontrado!' });
        }

        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            console.log('Senha incorreta');
            return res.status(400).json({ msg: 'senha incorreta' });
        }

        // Define o payload do token JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
