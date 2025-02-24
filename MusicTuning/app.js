// app.js
const express = require('express');
const connectDB = require('./database'); // Conectando ao MongoDB através do módulo
const bcrypt = require('bcryptjs'); // Biblioteca para hashing de senhas
const jwt = require('jsonwebtoken'); // Biblioteca para geração de tokens JWT
const User = require('./models/model'); 
const path = require('path');
const nodemailer = require('nodemailer'); // Para enviar emails

const app = express();

// Conexão com o MongoDB (mantendo a conexão com o módulo)
connectDB();

app.use(express.json()); // Middleware para permitir a aplicação lidar com dados em JSON
app.use(express.static(path.join(__dirname, 'web'))); // Middleware para servir arquivos estáticos (como HTML, CSS, JS)

// Redirecionar a raiz para pgLogin.html
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Rota para exibir a página de login (pgLogin.html)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'login', 'pgLogin.html'));
});

// Função para enviar o email de confirmação

// const sendConfirmationEmail = (email, token) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'your-email@gmail.com', // Insira o seu e-mail aqui
//             pass: 'your-email-password', // Insira a senha do seu e-mail aqui
//         },
//     });

//     const mailOptions = {
//         from: 'your-email@gmail.com', // Seu e-mail
//         to: email,
//         subject: 'Confirmação de Cadastro',
//         text: `Clique no link abaixo para confirmar o seu cadastro:\n\nhttp://localhost:5000/confirm/${token}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log('Erro ao enviar email:', error);
//         } else {
//             console.log('Email enviado:', info.response);
//         }
//     });
// };




///// TODOS CÓDIGOS PARA A CONFIRMAÇÃO DE SENHA ESTÁ COMENTADO , PARA NÃO INTERVIR O PROCESSO DE CADASTRO ANTERIOR !!!!!

///// A CONFIRMARÇÃO SERÁ FEITA AGORA ATRÁVES DO TWILIO , SERÁ ENVIADO POR SMS !!    


// Rota para registro de usuário
app.post('/api/register', async (req, res) => {
    const { nome, email, senha, telefone } = req.body;

    try {
        // Verificando se o usuário já existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Este email já está sendo usado' });
        }

        user = new User({
            nome,
            email,
            senha,
            telefone,
            // isVerified: false, // Flag para verificar se o email foi confirmado
        });

        // Gerando um salt para hashing da senha
        const salt = await bcrypt.genSalt(10);
        // Hashing da senha
        user.senha = await bcrypt.hash(senha, salt);

        // Salvando o usuário no banco
        await user.save();

        // Gerando um token para o e-mail de confirmação

        // const token = jwt.sign(
        //     { id: user._id },
        //     'jwtSecret', 
        //     { expiresIn: '15m' }
        // );

        // // Enviando e-mail de confirmação
        // sendConfirmationEmail(email, token);

        console.log('Usuário registrado com sucesso:', user);
        res.json({ msg: 'Você se cadastrou com sucesso!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para confirmar o e-mail do usuário

// app.get('/confirm/:token', async (req, res) => {
//     const { token } = req.params;

//     try {
//         // Verificando o token
//         const decoded = jwt.verify(token, 'jwtSecret');

//         // Encontrando o usuário e marcando como verificado
//         const user = await User.findById(decoded.id);
//         if (!user) {
//             return res.status(400).json({ msg: 'Usuário não encontrado!' });
//         }

//         user.isVerified = true;
//         await user.save();

//         res.json({ msg: 'Cadastro confirmado com sucesso! Agora você pode fazer login.' });
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Erro no servidor');
//     }
// });

// Rota para login de usuário
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(400).json({ msg: 'Usuário não encontrado!' });
        }

        // // Verificando se o usuário está confirmado
        // if (!user.isVerified) {
        //     return res.status(400).json({ msg: 'Confirme seu e-mail antes de fazer login. ' });
        // }

        const comparaSenha = await bcrypt.compare(senha, user.senha);
        if (!comparaSenha) {
            console.log('Senha incorreta');
            return res.status(400).json({ msg: 'Senha incorreta' });
        }

        // Gerando o token JWT
        const gerandoToken = {
            user: {
                id: user.id
            }
        };

        jwt.sign(gerandoToken, 'jwtSecret', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, redirect: '/logado/pgLogado.html' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));
