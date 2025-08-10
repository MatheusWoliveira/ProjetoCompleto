// BACK/controllers/musicController.js
const Music = require('../models/musicModel');
const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const { URL: NodeURL } = require('url');
require('dotenv').config();

// Garantir compatibilidade do globalThis.URL no Node
if (typeof globalThis.URL !== 'function') {
  globalThis.URL = NodeURL;
  console.warn('globalThis.URL foi restaurado a partir de require("url").URL');
}

// Configurações AWS
const {
  AWS_REGION,
  AWS_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} = process.env;

if (!AWS_REGION || !AWS_BUCKET_NAME || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  console.warn('⚠️ Variáveis AWS ausentes no .env');
}

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
});

// Função para construir URL pública do S3
function buildS3Url(bucket, region, key) {
  const encodedKey = key.split('/').map(encodeURIComponent).join('/');
  return region === 'us-east-1'
    ? `https://${bucket}.s3.amazonaws.com/${encodedKey}`
    : `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
}

// Sanitizar nome do arquivo
function sanitizeFileName(name = '') {
  return name
    .replace(/\s+/g, '_')
    .replace(/[^\w\-.()%]/g, '')
    .toLowerCase();
}

// Upload de música
exports.uploadMusic = async (req, res) => {
  try {
    const { capa, arquivo } = req.files || {};

    // Validação dos campos obrigatórios
    if (!capa?.[0] || !arquivo?.[0]) {
      return res.status(400).json({ error: 'Arquivo de capa e música são obrigatórios.' });
    }
    if (!req.body.titulo?.trim() || !req.body.artista?.trim()) {
      return res.status(400).json({ error: 'Título e artista são obrigatórios.' });
    }

    // Tipos permitidos
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const allowedAudioTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav'];

    if (!allowedImageTypes.includes(capa[0].mimetype)) {
      return res.status(400).json({ error: 'Formato de imagem inválido. Use JPEG, PNG ou WEBP.' });
    }
    if (!allowedAudioTypes.includes(arquivo[0].mimetype)) {
      return res.status(400).json({ error: 'Formato de áudio inválido. Use MP3 ou WAV.' });
    }

    // Upload para S3
    const uploadResults = await Promise.all(
      ['capa', 'arquivo'].map(async field => {
        const file = req.files[field][0];
        const sanitized = sanitizeFileName(file.originalname);
        const key = `${field}/${Date.now()}_${sanitized}`;

        const uploadParams = {
          Bucket: AWS_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype || 'application/octet-stream',
          ACL: 'public-read'
        };

        try {
          await new Upload({ client: s3Client, params: uploadParams }).done();
        } catch (uploadErr) {
          throw new Error(`Erro ao enviar ${field} para o S3: ${uploadErr.message}`);
        }

        return { field, location: buildS3Url(AWS_BUCKET_NAME, AWS_REGION, key) };
      })
    );

    const urls = Object.fromEntries(uploadResults.map(({ field, location }) => [field, location]));

    // Salvar no banco
    const newMusic = await Music.create({
      titulo: req.body.titulo.trim(),
      artista: req.body.artista.trim(),
      capa: urls.capa,
      arquivo: urls.arquivo
    });

    res.status(201).json({
      message: 'Música enviada com sucesso!',
      music: {
        id: newMusic._id,
        titulo: newMusic.titulo,
        artista: newMusic.artista,
        capaUrl: newMusic.capa,
        arquivoUrl: newMusic.arquivo,
        createdAt: newMusic.createdAt || null
      }
    });
  } catch (err) {
    console.error('🚨 Erro ao enviar música:', err);
    res.status(500).json({ error: err.message || 'Erro ao enviar música.' });
  }
};

// Lista todas as músicas com paginação
exports.getAllMusics = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const musics = await Music.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(musics.map(m => ({
      id: m._id,
      titulo: m.titulo,
      artista: m.artista,
      capaUrl: m.capa,      // já retorna URL pública
      arquivoUrl: m.arquivo, // já retorna URL pública
      createdAt: m.createdAt || null
    })));
  } catch (err) {
    console.error('Erro ao buscar músicas:', err);
    res.status(500).json({ error: 'Erro ao buscar músicas.' });
  }
};
