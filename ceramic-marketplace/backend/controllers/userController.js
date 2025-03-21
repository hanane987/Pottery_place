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

exports.getStatistics = async (req, res) => {
    try {
        const vendeurCount = await User.countDocuments({ role: 'vendeur' });
        const acheteurCount = await User.countDocuments({ role: 'acheteur' });
        const totalProducts = await Product.countDocuments();

        console.log("Vendeur Count:", vendeurCount);
        console.log("Acheteur Count:", acheteurCount);
        console.log("Total Products:", totalProducts);

        res.json({
            vendeurCount,
            acheteurCount,
            totalProducts,
        });
    } catch (error) {
        console.error("Error fetching statistics:", error);
        res.status(500).json({ message: error.message });
    }
};