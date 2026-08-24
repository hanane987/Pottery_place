import express from 'express';
import { storeContactMessage, getContactMessages } from '../controllers/contactController.js';

const router = express.Router();

router.post('/', storeContactMessage);
router.get('/', getContactMessages);

export default router;