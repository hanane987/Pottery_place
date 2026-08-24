import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nom: { type: String, required: true }, 
    description: { type: String, required: true }, 
    prix: { type: Number, required: true }, 
    quantite_stock: { type: Number, required: true }, 
    artisan_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    categorie_id: { type: String, default: '' },
    images: { type: [String], default: [] }, 
    date_ajout: { type: Date, default: Date.now }, 
    etat: { type: String, enum: ['disponible', 'épuisé'], default: 'disponible' },
    
 
});

const Product = mongoose.model('Product', productSchema);

export default Product;
