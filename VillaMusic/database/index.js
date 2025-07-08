// database/index.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/seuBancoDeDados');
        console.log('Conectado ao MongoDB com sucesso');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        process.exit(1); // Encerra o processo com falha
    }
};

module.exports = connectDB;
