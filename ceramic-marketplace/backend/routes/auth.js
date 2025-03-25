import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'; // Ensure you use the .js extension
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router; // Make sure this line is present