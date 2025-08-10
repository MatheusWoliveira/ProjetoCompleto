// models/musicModel.js
const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  artista: { type: String, required: true },
  capa: { type: String, required: true },
  arquivo: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // novo
}, { timestamps: true });

module.exports = mongoose.model('Music', musicSchema);
