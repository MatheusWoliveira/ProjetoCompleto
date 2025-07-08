// controllrs/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'chave-secreta-villamusic';

// Cadastro
exports.registerUser = async (req, res) => {
  const { nome, email, senha, telefone } = req.body;

  try {
    const userExistente = await User.findOne({ email });
    if (userExistente) {
      return res.status(400).json({ msg: 'E-mail já está cadastrado!' });
    }

    // Criptografar a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUser = new User({
      nome,
      email,
      senha: senhaHash,
      telefone
    });

    await novoUser.save();
    res.status(201).json({ msg: 'Usuário cadastrado com sucesso!' });
  } catch (erro) {
    res.status(500).json({ msg: 'Erro no servidor', erro });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'E-mail ou senha incorretos!' });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ msg: 'E-mail ou senha incorretos!' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: user._id, nome: user.nome }, JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({
      msg: 'Login realizado com sucesso!',
      token,
      nome: user.nome
    });
  } catch (erro) {
    res.status(500).json({ msg: 'Erro no servidor', erro });
  }
};

