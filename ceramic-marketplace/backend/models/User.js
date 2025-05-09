const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'acheteur', 'vendeur'], required: true },
    is_banned: { type: Boolean, required: true ,default:false},

});

const User = mongoose.model('User', userSchema);
module.exports = User;
