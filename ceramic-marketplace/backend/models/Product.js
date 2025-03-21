const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nom: { type: String, required: true }, 
    description: { type: String, required: true }, 
    prix: { type: Number, required: true }, 
    quantite_stock: { type: Number, required: true }, 
    artisan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    images: { type: [String], default: [] }, 
    date_ajout: { type: Date, default: Date.now }, 
    etat: { type: String, enum: ['disponible', 'épuisé'], default: 'disponible' },
    
 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
