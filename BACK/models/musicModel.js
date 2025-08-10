// BACK/models/musicModel.js
const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  titulo: String,
  artista: String,
  capa: String,     
  arquivo: String   
});

module.exports = mongoose.model('Music', musicSchema);

