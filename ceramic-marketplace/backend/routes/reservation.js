// routes/reservation.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// POST /api/reserve
router.post('/reserve', reservationController.createReservation);
router.get('/reservations', reservationController.getAllReservations);
router.get('/reservations/vendor/:vendorId', reservationController.getOrdersByVendor);
// router.post('/', createReservation); // Create a new reservation
// router.get('/', getAllReservations); // Get all reservations
// router.get('/vendor/:vendorId', getOrdersByVendor); // Get orders by vendor
// router.post('/reserve', reservationController.createReservation); // Ensure this line exists
router.get('/vendor/:vendorId', async (req, res) => {
    try {
      const vendorId = req.params.vendorId;
      const reservations = await Reservation.find({ vendorId }); // Adjust the query as necessary
      res.status(200).json(reservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
module.exports = router;


