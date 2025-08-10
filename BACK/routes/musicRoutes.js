// BACK/routes/musicRoutes.js
const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware'); // novo

// Configuração do Multer (usa memória pois enviamos direto ao S3)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // limite 50MB por arquivo
});

// Upload de música (capa + arquivo) — somente usuário logado
router.post(
  '/upload',
  authMiddleware, // protege a rota
  upload.fields([
    { name: 'capa', maxCount: 1 },
    { name: 'arquivo', maxCount: 1 }
  ]),
  musicController.uploadMusic
);

// Listar músicas do usuário logado
router.get('/', authMiddleware, musicController.getAllMusics);

// Excluir música (botão apagar)
router.delete('/:id', authMiddleware, musicController.deleteMusic);

module.exports = router;
