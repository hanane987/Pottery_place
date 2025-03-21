

const Reservation = require('../models/Reservation');
const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.createReservation = async (req, res) => {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid or empty items array' });
    }

    try {
        const reservations = [];
        for (const item of items) {
            const { productId, userId, quantity, name, email, address } = item;

            if (!productId || !userId || !quantity || !name || !email || !address) {
                return res.status(400).json({ error: 'Missing required fields in reservation item' });
            }

            const product = await Product.findById(productId);
            console.log(`Product ID: ${productId}, Available Stock: ${product.quantite_stock}, Requested Quantity: ${quantity}`);

            if (!product) {
                return res.status(400).json({ error: `Product ${productId} not found` });
            }
            if (product.quantite_stock < quantity) {
                return res.status(400).json({ 
                    error: `Product ${product.nom} not available in requested quantity. Requested: ${quantity}, Available: ${product.quantite_stock}` 
                });
            }
