import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts'; 
import ManageUsers from './pages/admin/ManageUsers'; 
import LandingPage from './pages/user/AcheteurDashboard'; 
import Main from './pages/user/FurniroPage';
import Index from './pages/user/Shop';
import Home from './pages/user/Home';
import About from './pages/user/About';
import Contact from './pages/user/Contact';
import ContactMessagesWithSidebar from './pages/admin/ContactMessages';
// import PotteryDashboard from './pages/vendeur/VendeurDashboard';
import ProductDetail from './pages/user/ProductDetail';
import PrivateRoute from './PrivateRoute'; 
import Reservation from './pages/user/Reservation';
import DashboardPage from './pages/vendeur/DashboardPage';
import OrdersPage from './pages/vendeur/OrdersPage';
import ProductsPage from './pages/vendeur/ProductsPage';
const App = () => {
    
    const userRole = localStorage.getItem('userRole'); 

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
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
                {/* <Route path="/vendeur-dashboard" element={<PotteryDashboard />} /> */}
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/reserve" element={<Reservation />} />
           
                <Route path="/vendor/dashboard" element={<DashboardPage />} />
        <Route path="/vendor/orders" element={<OrdersPage />} />
        <Route path="/vendor/products" element={<ProductsPage />} />

                {/* <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} allowedRoles={['admin']} userRole={userRole} />} />
                <Route path="/manage-users" element={<PrivateRoute element={<ManageUsers />} allowedRoles={['admin']} userRole={userRole} />} />
                <Route path="/manage-products" element={<PrivateRoute element={<ManageProducts />} allowedRoles={['admin']} userRole={userRole} />} />
                <Route path="/furniro" element={<Main />} />
                <Route path="/shop" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/contact-messages" element={<PrivateRoute element={<ContactMessagesWithSidebar />} allowedRoles={['admin']} userRole={userRole} />} />
                <Route path="/vendeur-dashboard" element={<PrivateRoute element={<PotteryDashboard />} allowedRoles={['vendeur']} userRole={userRole} />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/reserve" element={<Reservation />} /> */}
            </Routes>
        </Router>
    );
};

export default App;