
const User = require('../models/User'); 
const Product = require('../models/Product'); 

exports.getArtisans = async (req, res) => {
    try {
        const artisans = await User.find({
            $or: [
                { role: 'vendeur' },
                { role: 'acheteur' }
            ]
        });
        console.log(artisans); 

        if (artisans.length === 0) {
            console.log("No artisans found with the specified roles.");
        }

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

exports.banUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { is_banned: true }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.unbanUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { is_banned: false }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
