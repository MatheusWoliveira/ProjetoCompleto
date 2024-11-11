// models/model.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    // isVerified: {
    //     type: Boolean,
    //     default: false
    // },
    // verificationToken: {
    //     type: String,
    //     default: null
    // }
});

module.exports = mongoose.model('User', UserSchema);
