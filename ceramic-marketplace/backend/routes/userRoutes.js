// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 

router.get('/artisans', userController.getArtisans); 
router.get('/statistics', userController.getStatistics); 

module.exports = router;