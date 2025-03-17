import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './user/Login';
import Register from './user/Register';
import AdminDashboard from './user/AdminDashboard';
import ManageProducts from './admin/ManageProducts'; 
import ManageUsers from './user/ManageUsers'; 
import LandingPage from './user/AcheteurDashboard'; 
// import ProductPage from './product/ProductPage'; 
import Main from './user/FurniroPage';
import Index from './user/Shop';
import About from './user/About';
import Contact from './user/Contact';
import ContactMessagesWithSidebar from './user/ContactMessages';
import PotteryDashboard from './user/VendeurDashboard';
import ProductDetail from './user/ProductDetail';
import PrivateRoute from './PrivateRoute'; 
import Reservation from './user/Reservation';

const App = () => {
    
    const userRole = localStorage.getItem('userRole'); 

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/manage-users" element={<ManageUsers/>} />
                <Route path="/manage-products" element={<ManageProducts />} />
                <Route path="/furniro" element={<Main />} />
                <Route path="/shop" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/contact-messages" element={<ContactMessagesWithSidebar />} />
                <Route path="/vendeur-dashboard" element={<PotteryDashboard />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/reserve" element={<Reservation />} />
            </Routes>
        </Router>
    );
};

export default App;