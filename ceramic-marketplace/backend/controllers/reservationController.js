

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
   
            const reservation = new Reservation({
                productId,
                userId,
                vendorId: product.artisan_id || "default_vendor_id",
                quantity,
                name,
                email,
                address,
                reservedAt: new Date(),
                expiresAt: new Date(Date.now() + 7 * 24 * 3600000), 
            });

            product.quantite_stock -= quantity;
            await product.save();

            reservations.push(reservation);
        }

        await Promise.all(reservations.map(r => r.save()));
        res.status(201).json({ message: 'Reservations created successfully', reservations });
    } catch (error) {
        console.error("Error creating reservations:", error);
        res.status(500).json({ error: 'Error creating reservations' });
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('productId')
            .populate('userId', 'nom email');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching reservations' });
    }
};

exports.getOrdersByVendor = async (req, res) => {
    const vendorId = req.params.vendorId;
    try {
        const orders = await Reservation.find({ vendorId })
            .populate('productId')
            .populate('userId', 'nom email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};