// backend/routes/userRoutes.js
import express from 'express';
import { getArtisans, getStatistics, banUser, unbanUser, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.get('/artisans', getArtisans);
router.get('/statistics', getStatistics);

router.put('/ban/:userId', banUser);
router.put('/unban/:userId', unbanUser);
router.get('/:userId', getUserById);

export default router;
