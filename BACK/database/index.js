const URL = require('./URL.js');

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`${URL}`);
        console.log('✅ Conectado ao MongoDB Atlas com sucesso');
    } catch (err) {
        console.error('❌ Erro ao conectar ao MongoDB Atlas:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
