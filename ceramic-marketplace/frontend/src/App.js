// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import Register from './user/Register';
import AdminDashboard from './user/AdminDashboard';
import ManageProducts from './admin/ManageProducts'; 
import LandingPage from './user/AcheteurDashboard'; 
import ProductPage from './product/ProductPage'; 
import Main from './user/FurniroPage';
import Index from './user/Shop';
import About from './user/About';
import Contact from './user/Contact';
import ContactMessages from './user/ContactMessages';

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<LandingPage />} />
            
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
                    <Route path="manage-products" element={<ManageProducts />} /> 
                    <Route path="/product/:id"element={<ProductPage />} /> 
                    <Route path="/furniro" element={<Main />} />
                    <Route path="/shop" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/contact-messages" element={<ContactMessages />} />
            </Routes>
        </Router>
    );
};

export default App;