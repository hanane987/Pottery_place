import express from 'express';
const { storeContactMessage, getContactMessages } = require('../controllers/contactController');

const router = express.Router();

router.post('/', storeContactMessage);
router.get('/', getContactMessages);

module.exports = router;