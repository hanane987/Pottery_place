// models/Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }, // Add this line

    quantity: { type: Number, required: true },
    reservedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }, 
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;