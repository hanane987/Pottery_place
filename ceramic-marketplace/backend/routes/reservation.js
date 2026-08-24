
import express from 'express';
import * as reservationController from '../controllers/reservationController.js';

const router = express.Router();


router.post('/reserve', reservationController.createReservation);
router.get('/reservations', reservationController.getAllReservations);
router.get('/reservations/vendor/:vendorId', reservationController.getOrdersByVendor);
router.post('/', reservationController.createReservation); 
router.get('/vendor/:vendorId', reservationController.getOrdersByVendor);
export default router;