// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getArtisans, getStatistics, banUser, unbanUser } = require('../controllers/userController');

router.get('/artisans', getArtisans);
router.get('/statistics', getStatistics);

router.put('/ban/:userId', banUser);
router.put('/unban/:userId', unbanUser);

module.exports = router;
