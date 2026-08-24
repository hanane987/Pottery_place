import { useState, useEffect, useCallback } from "react";
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
  
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/vendor/${vendorId}`);
      console.log("Fetched Orders:", response.data);
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  }, [vendorId]);

  useEffect(() => {
    if (vendorId) {
      fetchOrders();
    }
  }, [vendorId, fetchOrders]);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.svg?height=64&width=64";
    return imagePath.startsWith("http") ? imagePath : `http://localhost:5000${imagePath}`;
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
                    <th>Image</th>
                    <th>Product</th>
                    <th>Buyer</th>
                    <th>Email</th>
                    <th>Pickup Address</th>
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
                        String(order.productId?.nom || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                        String(order.name || order.userId?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                        String(order.email || order.userId?.email || "").toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((order) => (
                        <tr key={order._id}>
                          <td>
                            <img
                              className="order-product-thumbnail"
                              src={getImageUrl(order.productId?.images?.[0])}
                              alt={order.productId?.nom || "Product"}
                            />
                          </td>
                          <td>{order.productId ? order.productId.nom : "Product Not Found"}</td>
                          <td>{order.name || order.userId?.name || "Unknown buyer"}</td>
                          <td>{order.email || order.userId?.email || "-"}</td>
                          <td>{order.address || "-"}</td>
                          <td>{order.quantity}</td>
                          <td>
                            {Number.isFinite(Number(order.productId?.prix) * Number(order.quantity))
                              ? `$${(Number(order.productId.prix) * Number(order.quantity)).toFixed(2)}`
                              : "N/A"}
                          </td>
                          <td>{new Date(order.reservedAt).toLocaleString()}</td>
                          <td>{new Date(order.expiresAt).toLocaleString()}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="9">No orders available</td>
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