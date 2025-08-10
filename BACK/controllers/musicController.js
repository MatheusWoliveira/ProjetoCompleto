// BACK/controllers/musicController.js
const Music = require('../models/musicModel');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const { URL: NodeURL } = require('url');
require('dotenv').config();

// Garantir que globalThis.URL exista (compatibilidade Node)
if (typeof globalThis.URL !== 'function') {
  globalThis.URL = NodeURL;
  console.warn('globalThis.URL foi restaurado a partir de require("url").URL');
}

// Configurações AWS (do .env)
const {
  AWS_REGION,
  AWS_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} = process.env;

if (!AWS_REGION || !AWS_BUCKET_NAME || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  console.warn('⚠️ Variáveis AWS ausentes no .env (AWS_REGION, AWS_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)');
}

// Cliente S3 (v3)
const s3Client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
});

// Função para construir URL pública do S3 (faz encode do key)
function buildS3Url(bucket, region, key) {
  const encodedKey = key.split('/').map(encodeURIComponent).join('/');
  return region === 'us-east-1'
    ? `https://${bucket}.s3.amazonaws.com/${encodedKey}`
    : `https://${bucket}.s3.${region}.amazonaws.com/${encodedKey}`;
}

// Extrai o key do objeto a partir da URL pública do S3
function getKeyFromS3Url(url) {
  try {
    const u = new URL(url);
    // pathname começa com '/', remover
    return decodeURIComponent(u.pathname.replace(/^\/+/, ''));
  } catch (err) {
    return null;
  }
}

// Sanitizar nome do arquivo (remover espaços/caracteres inválidos)
function sanitizeFileName(name = '') {
  return name
    .replace(/\s+/g, '_')
    .replace(/[^\w\-.()%]/g, '')
    .toLowerCase();
}

/**
 * uploadMusic
 * - exige req.user (middleware de auth deve preencher)
 * - faz upload da capa e do arquivo para S3 (public-read)
 * - salva registro no Mongo com userId
 */
exports.uploadMusic = async (req, res) => {
  try {
    // autenticação
    const userId = req.user?.id || req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    const { capa, arquivo } = req.files || {};

    // Validação dos campos obrigatórios
    if (!capa?.[0] || !arquivo?.[0]) {
      return res.status(400).json({ error: 'Arquivo de capa e música são obrigatórios.' });
    }
    if (!req.body.titulo?.trim() || !req.body.artista?.trim()) {
      return res.status(400).json({ error: 'Título e artista são obrigatórios.' });
    }

    // Tipos permitidos (ajuste conforme necessidade)
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const allowedAudioTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav'];

    if (!allowedImageTypes.includes(capa[0].mimetype)) {
      return res.status(400).json({ error: 'Formato de imagem inválido. Use JPEG, PNG ou WEBP.' });
    }
    if (!allowedAudioTypes.includes(arquivo[0].mimetype)) {
      return res.status(400).json({ error: 'Formato de áudio inválido. Use MP3 ou WAV.' });
    }

    // Upload para S3 (capa e arquivo) em paralelo
    const uploadResults = await Promise.all(
      ['capa', 'arquivo'].map(async (field) => {
        const file = req.files[field][0];
        if (!file || !file.buffer) {
          throw new Error(`Arquivo "${field}" inválido ou ausente.`);
        }

        const sanitized = sanitizeFileName(file.originalname);
        const key = `${field}/${Date.now()}_${sanitized}`;

        const uploadParams = {
          Bucket: AWS_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype || 'application/octet-stream',
          ACL: 'public-read' // garante leitura pública (desde que bucket permita)
        };

        try {
          // lib-storage para multipart/resumable upload
          await new Upload({ client: s3Client, params: uploadParams }).done();
          const location = buildS3Url(AWS_BUCKET_NAME, AWS_REGION, key);
          return { field, location, key };
        } catch (uploadErr) {
          console.error(`Erro no upload do campo "${field}":`, uploadErr);
          throw new Error(`Erro ao enviar ${field} para o S3: ${uploadErr.message || uploadErr}`);
        }
      })
    );

    // Criar mapa de urls e keys
    const urls = Object.fromEntries(uploadResults.map(r => [r.field, r.location]));
    const keys = Object.fromEntries(uploadResults.map(r => [r.field, r.key]));

    // Salvar no banco com associação ao usuário
    const newMusic = await Music.create({
      titulo: req.body.titulo.trim(),
      artista: req.body.artista.trim(),
      capa: urls.capa,
      arquivo: urls.arquivo,
      userId: userId, // vincula ao usuário logado
      // opcional: salvar as keys se quiser (verifique schema)
      // capaKey: keys.capa,
      // arquivoKey: keys.arquivo
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
    console.error('🚨 Erro ao enviar música:', err && err.stack ? err.stack : err);
    res.status(500).json({ error: err.message || 'Erro ao enviar música.' });
  }
};

/**
 * getAllMusics
 * - lista apenas músicas do usuário autenticado (paginado)
 */
exports.getAllMusics = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado.' });

    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;

    const musics = await Music.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const formatted = musics.map(m => ({
      id: m._id,
      titulo: m.titulo,
      artista: m.artista,
      capaUrl: m.capa,
      arquivoUrl: m.arquivo,
      createdAt: m.createdAt || null
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error('Erro ao buscar músicas:', err);
    res.status(500).json({ error: 'Erro ao buscar músicas.' });
  }
};

/**
 * deleteMusic
 * - verifica dono (req.user) antes de apagar
 * - deleta objetos no S3 (capa e arquivo) e remove registro do Mongo
 */
exports.deleteMusic = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    if (!userId) return res.status(401).json({ error: 'Usuário não autenticado.' });

    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID da música é obrigatório.' });

    const music = await Music.findById(id);
    if (!music) return res.status(404).json({ error: 'Música não encontrada.' });

    // somente o dono pode excluir
    if (music.userId?.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Você não tem permissão para excluir esta música.' });
    }

    // apagar arquivos do S3 (se existirem)
    const keysToDelete = [];
    if (music.capa) {
      const k = getKeyFromS3Url(music.capa);
      if (k) keysToDelete.push(k);
    }
    if (music.arquivo) {
      const k = getKeyFromS3Url(music.arquivo);
      if (k) keysToDelete.push(k);
    }

    // deletar objetos (um por um)
    for (const key of keysToDelete) {
      try {
        const cmd = new DeleteObjectCommand({
          Bucket: AWS_BUCKET_NAME,
          Key: key
        });
        await s3Client.send(cmd);
        console.log(`✅ Apagado do S3: ${key}`);
      } catch (delErr) {
        // log e continua (não impedimos a remoção do DB se o S3 falhar)
        console.error(`Falha ao apagar ${key} do S3:`, delErr);
      }
    }

    // remover registro do Mongo
    await Music.findByIdAndDelete(id);

    res.json({ message: 'Música excluída com sucesso.' });
  } catch (err) {
    console.error('Erro ao excluir música:', err && err.stack ? err.stack : err);
    res.status(500).json({ error: 'Erro ao excluir música.' });
  }
};
