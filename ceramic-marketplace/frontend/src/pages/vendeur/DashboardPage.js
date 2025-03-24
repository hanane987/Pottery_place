import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import TopNav from "../../components/common/TopNav";
import Footer from "../../components/common/Footer";
import "../../styles/pottery-dashboard.css";
import { DollarSign, ShoppingBag, Package, BarChart2 } from "lucide-react";

const DashboardPage = () => {
  const [vendorId, setVendorId] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [artisans, setArtisans] = useState([]);

  const categories = [
    { id: "60b8d8f9e3c1f8c1d4e0e1a1", name: "Category 1" },
    { id: "60b8d8f9e3c1f8c1d4e0e1a2", name: "Category 2" },
    { id: "60b8d8f9e3c1f8c1d4e0e1a3", name: "Category 3" },
    { id: "60b8d8f9e3c1f8c1d4e0e1a4", name: "Category 4" },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        setVendorId(decodedToken.id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("No token found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (vendorId) {
      fetchProducts();
      fetchArtisans();
      fetchOrders();
    }
  }, [vendorId]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      if (!vendorId) {
        console.error("No vendorId available to fetch products");
        setProducts([]);
        return;
      }
      console.log("Fetching products for artisan_id:", vendorId);
      const url = `http://localhost:5000/api/products?artisan_id=${vendorId}`;
      console.log("Request URL:", url);
      const response = await axios.get(url);
      console.log("API Response:", response.data);
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching products:", error.response ? error.response.data : error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtisans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/artisans");
      console.log("Fetched Artisans:", response.data);
      setArtisans(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching artisans:", error);
      setArtisans([]);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reservations/vendor/${vendorId}`);
      console.log("Fetched Orders:", response.data);
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const totalRevenue = orders.reduce((sum, order) => {
    if (!order.productId) {
      console.warn("Order with missing productId:", order);
      return sum;
    }
    return sum + (order.productId.prix * order.quantity);
  }, 0);

  const totalOrders = orders.length;
  const totalProducts = products.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const productSales = orders.reduce((acc, order) => {
    if (!order.productId) {
      console.warn("Order with missing productId in productSales:", order);
      return acc;
    }
    const productId = order.productId._id;
    acc[productId] = (acc[productId] || 0) + order.quantity;
    return acc;
  }, {});

  const topProducts = products
    .map(product => ({
      ...product,
      totalSold: productSales[product._id] || 0
    }))
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 4);