const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); 
const productRoutes = require('./routes/productRoutes'); 

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', 
}));
app.use(bodyParser.json());
app.use('/images', express.static('public/images')); 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully'); 
    })
    .catch(err => {
        console.error('MongoDB connection error:', err); 
    });

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/products', productRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});