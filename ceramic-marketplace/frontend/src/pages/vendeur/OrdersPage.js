import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import Sidebar from "../../components/common/Sidebar";
import TopNav from "../../components/common/TopNav";
import Footer from "../../components/common/Footer";
import "../../styles/pottery-dashboard.css";

import { Search } from "lucide-react";

const OrdersPage = () => {
  const [vendorId, setVendorId] = useState(null);
  const [activeSection, setActiveSection] = useState("orders");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
      fetchOrders();
    }
  }, [vendorId]);

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

  return (
    <div className="pottery-dashboard">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="main-content">
        <TopNav
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <div className="dashboard-content">
          <div className="orders-section">
            <div className="section-header-with-actions">
              <h2>Manage Orders</h2>
              <div className="header-actions">
                <div className="search-container">
                  <Search size={18} />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Customer ID</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Reserved At</th>
                    <th>Expires At</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders
                      .filter(order =>
                        (order.productId && order.productId.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        order._id.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.productId ? order.productId.nom : "Product Not Found"}</td>
                          <td>{order.userId._id}</td>
                          <td>{order.quantity}</td>
                          <td>
                            {order.productId
                              ? `$${(order.productId.prix * order.quantity).toFixed(2)}`
                              : "N/A"}
                          </td>
                          <td>{new Date(order.reservedAt).toLocaleString()}</td>
                          <td>{new Date(order.expiresAt).toLocaleString()}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="7">No orders available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default OrdersPage;