import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
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

  const categories = [
    { id: "60b8d8f9e3c1f8c1d4e0e1a1", name: "Category 1" },
    { id: "60b8d8f9e3c1f8c1d4e0e1a2", name: "Category 2" },
    { id: "60b8d8f9e3c1f8c1d4e0e1a3", name: "Category 3" },
    { id: "60b8d8f9e3c1f8c1d4e0e1a4", name: "Category 4" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
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

  const fetchProducts = useCallback(async () => {
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
  }, [vendorId, setProducts, setLoading]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reservations/vendor/${vendorId}`);
      console.log("Fetched Orders:", response.data);
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    }
  }, [vendorId, setOrders]);

  useEffect(() => {
    if (vendorId) {
      fetchProducts();
      fetchOrders();
    }
  }, [vendorId, fetchProducts, fetchOrders]);

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
    .map((product) => ({
      ...product,
      totalSold: productSales[product._id] || 0,
    }))
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 4);

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
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="dashboard-section">
              <h2>Dashboard Overview</h2>
              <div className="stats-cards">
                <div className="stat-card">
                  <div className="stat-icon revenue">
                    <DollarSign size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Total Revenue</h3>
                    <p className="stat-value">${totalRevenue.toFixed(2)}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon orders">
                    <ShoppingBag size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Total Orders</h3>
                    <p className="stat-value">{totalOrders}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon products">
                    <Package size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Products</h3>
                    <p className="stat-value">{totalProducts}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon average">
                    <BarChart2 size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Average Order</h3>
                    <p className="stat-value">${averageOrderValue.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="dashboard-grid">
                <div className="recent-orders">
                  <div className="section-header">
                    <h3>Recent Orders</h3>
                  </div>
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Customer ID</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Reserved At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map((order) => (
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
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr>
                          <td colSpan="6">No recent orders</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="top-products">
                  <div className="section-header">
                    <h3>Top Products</h3>
                    <button className="view-all-btn" onClick={() => setActiveSection("products")}>
                      View All
                    </button>
                  </div>
                  <ul className="product-list-small">
                    {topProducts.map((product) => (
                      <li key={product._id} className="product-item-small">
                        <img
                          src={
                            product.images.length > 0
                              ? product.images[0]
                              : "/placeholder.svg?height=80&width=80"
                          }
                          alt={product.nom}
                        />
                        <div className="product-details-small">
                          <h4>{product.nom}</h4>
                          <p className="product-category">{getCategoryName(product.categorie_id)}</p>
                          <p className="product-price">${Number(product.prix).toFixed(2)}</p>
                          <p className="product-sales">Sold: {product.totalSold}</p>
                        </div>
                      </li>
                    ))}
                    {topProducts.length === 0 && <li>No top products yet</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default DashboardPage;