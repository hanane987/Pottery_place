import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js'; 
import productRoutes from './routes/productRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 
import contactRoutes from './routes/contactRoutes.js';
import reservationRoutes from './routes/reservation.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); 

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully'); 
    })
    .catch(err => {
        console.error('MongoDB connection error:', err); 
    });

app.use('/api/users', userRoutes); 
app.use('/api/products', productRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes); 
app.use('/api', reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});