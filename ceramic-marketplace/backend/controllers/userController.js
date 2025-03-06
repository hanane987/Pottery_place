// backend/controllers/userController.js
const User = require('../models/User'); 
const Product = require('../models/Product'); 


exports.getArtisans = async (req, res) => {
    try {
        const artisans = await User.find({ role: 'vendeur' }); 
        res.json(artisans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};