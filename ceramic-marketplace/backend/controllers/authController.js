import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
    console.log('📥 Data received from frontend:', req.body); // <-- Debug log

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }

    if (!['admin', 'acheteur', 'vendeur'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Must be admin, acheteur, or vendeur' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        console.log('✅ User created:', email);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('❌ Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' });
        res.json({ token, role: user.role });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

export const logoutUser = (req, res) => {
    res.status(200).json({ message: 'User logged out successfully' });
};