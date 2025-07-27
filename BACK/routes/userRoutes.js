// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// Rotas de usuário
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);

module.exports = router;
