//BACK/routes/musicRoutes.js
const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');
const multer = require('multer');

// Configuração do Multer (usa memória pois enviamos direto ao S3)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // limite 50MB por arquivo
});

// Upload de música (capa + arquivo)
router.post(
  '/upload',
  upload.fields([
    { name: 'capa', maxCount: 1 },
    { name: 'arquivo', maxCount: 1 }
  ]),
  musicController.uploadMusic
);

// Listar todas as músicas
router.get('/', musicController.getAllMusics);

module.exports = router;
