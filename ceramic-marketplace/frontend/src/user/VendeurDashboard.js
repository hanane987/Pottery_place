"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import "../styles/pottery-dashboard.css";
import {
  Home,
  Package,
  ShoppingBag,
  BarChart2,
  LogOut,
  Search,
  Bell,
  Plus,
  Edit,
  Trash2,
  Upload,
  X,
  DollarSign,
} from "lucide-react";

const PotteryDashboard = () => {
  const [vendorId, setVendorId] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [artisans, setArtisans] = useState([]);
  const [productFormData, setProductFormData] = useState({
    id: "",
    nom: "",
    description: "",
    prix: "",
    quantite_stock: "",
    artisan_id: "",
    categorie_id: "",
    images: [],
    etat: "disponible",
  });
  const [previewImages, setPreviewImages] = useState([]);

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

  useEffect(() => {
    if (vendorId) {
      setProductFormData((prevData) => ({
        ...prevData,
        artisan_id: vendorId,
      }));
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

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductFormData({ ...productFormData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductFormData({ ...productFormData, images: files });
    const newPreviewImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setPreviewImages(newPreviewImages);
  };

  const handleRemovePreview = (index) => {
    const updatedPreviews = [...previewImages];
    URL.revokeObjectURL(updatedPreviews[index].preview);
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);

    const updatedImages = [...productFormData.images];
    updatedImages.splice(index, 1);
    setProductFormData({ ...productFormData, images: updatedImages });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(productFormData).forEach(key => {
        if (key === 'images') {
          productFormData.images.forEach(image => formData.append('images', image));
        } else {
          formData.append(key, productFormData[key]);
        }
      });

      let response;
      if (isEditMode) {
        response = await axios.put(
          `http://localhost:5000/api/products/${productFormData.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/products",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      resetProductForm();
      setIsAddProductModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error.response ? error.response.data : error.message);
      alert("Error saving product. Please try again.");
    }
  };

  const handleEditProduct = (product) => {
    setIsEditMode(true);
    setProductFormData({
      id: product._id,
      nom: product.nom,
      description: product.description,
      prix: product.prix,
      quantite_stock: product.quantite_stock,
      artisan_id: product.artisan_id,
      categorie_id: product.categorie_id,
      images: product.images,
      etat: product.etat,
    });
    setPreviewImages(product.images.map(img => ({ file: null, preview: img })));
    setIsAddProductModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const resetProductForm = () => {
    setProductFormData({
      id: "",
      nom: "",
      description: "",
      prix: "",
      quantite_stock: "",
      artisan_id: vendorId,
      categorie_id: "",
      images: [],
      etat: "disponible",
    });
    setPreviewImages([]);
    setIsEditMode(false);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const totalRevenue = orders.reduce((sum, order) => {
    return sum + (order.productId.prix * order.quantity);
  }, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const productSales = orders.reduce((acc, order) => {
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

  return (
    <div className="pottery-dashboard">
      <aside className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <h1>Pottery Studio</h1>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeSection === "dashboard" ? "active" : ""}>
              <button onClick={() => setActiveSection("dashboard")}>
                <Home size={20} />
                <span>Dashboard</span>
              </button>
            </li>
            <li className={activeSection === "products" ? "active" : ""}>
              <button onClick={() => setActiveSection("products")}>
                <Package size={20} />
                <span>Products</span>
              </button>
            </li>
            <li className={activeSection === "orders" ? "active" : ""}>
              <button onClick={() => setActiveSection("orders")}>
                <ShoppingBag size={20} />
                <span>Orders</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-button">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-nav">
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="search-container">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="nav-actions">
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <img src="/placeholder.svg?height=40&width=40" alt="User" />
              <div className="user-info">
                <p className="user-name">Vendor Name</p>
                <p className="user-role">Vendor</p>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {activeSection === "dashboard" && (
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
                          <td>{order.productId.nom}</td>
                          <td>{order.userId._id}</td>
                          <td>{order.quantity}</td>
                          <td>${(order.productId.prix * order.quantity).toFixed(2)}</td>
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
                    {topProducts.length === 0 && (
                      <li>No top products yet</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === "products" && (
            <div className="products-section">
              <div className="section-header-with-actions">
                <h2>Manage Products</h2>
                <div className="header-actions">
                  <div className="search-container">
                    <Search size={18} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="add-btn" onClick={() => setIsAddProductModalOpen(true)}>
                    <Plus size={18} />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="loading-container">
                  <p>Loading products...</p>
                </div>
              ) : (
                <div className="table-container">
                  <table className="products-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products
                          .filter(product =>
                            product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            getCategoryName(product.categorie_id).toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((product) => (
                            <tr key={product._id}>
                              <td>
                                <img
                                  src={
                                    product.images.length > 0
                                      ? product.images[0]
                                      : "/placeholder.svg?height=80&width=80"
                                  }
                                  alt={product.nom}
                                  className="product-thumbnail"
                                />
                              </td>
                              <td>{product.nom}</td>
                              <td>{getCategoryName(product.categorie_id)}</td>
                              <td>${Number(product.prix).toFixed(2)}</td>
                              <td>{product.quantite_stock}</td>
                              <td>{product.etat}</td>
                              <td>
                                <button className="action-btn edit" onClick={() => handleEditProduct(product)}>
                                  <Edit size={16} />
                                </button>
                                <button className="action-btn delete" onClick={() => handleDeleteProduct(product._id)}>
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="7">No products available for this vendor</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeSection === "orders" && (
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
                          order.productId.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order._id.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((order) => (
                          <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.productId.nom}</td>
                            <td>{order.userId._id}</td>
                            <td>{order.quantity}</td>
                            <td>${(order.productId.prix * order.quantity).toFixed(2)}</td>
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
          )}
        </div>
      </main>

      {isAddProductModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{isEditMode ? "Edit Product" : "Add New Product"}</h3>
              <button
                className="close-modal-btn"
                onClick={() => {
                  setIsAddProductModalOpen(false);
                  resetProductForm();
                }}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleProductSubmit} className="product-form">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="product-name">Product Name</label>
                  <input
                    type="text"
                    id="product-name"
                    name="nom"
                    value={productFormData.nom}
                    onChange={handleProductFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="product-category">Category</label>
                  <select
                    id="product-category"
                    name="categorie_id"
                    value={productFormData.categorie_id}
                    onChange={handleProductFormChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="product-price">Price ($)</label>
                  <input
                    type="number"
                    id="product-price"
                    name="prix"
                    min="0.01"
                    step="0.01"
                    value={productFormData.prix}
                    onChange={handleProductFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="product-stock">Stock Quantity</label>
                  <input
                    type="number"
                    id="product-stock"
                    name="quantite_stock"
                    min="0"
                    value={productFormData.quantite_stock}
                    onChange={handleProductFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="product-status">Status</label>
                  <select
                    id="product-status"
                    name="etat"
                    value={productFormData.etat}
                    onChange={handleProductFormChange}
                  >
                    <option value="disponible">Available</option>
                    <option value="épuisé">Out of Stock</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="product-artisan">Artisan</label>
                  <select
                    id="product-artisan"
                    name="artisan_id"
                    value={productFormData.artisan_id}
                    onChange={handleProductFormChange}
                    required
                    disabled // Disable to ensure it’s always the logged-in vendor
                  >
                    <option value={vendorId}>{artisans.find(a => a._id === vendorId)?.nom || "Current Vendor"}</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="product-description">Description</label>
                  <textarea
                    id="product-description"
                    name="description"
                    value={productFormData.description}
                    onChange={handleProductFormChange}
                    required
                  ></textarea>
                </div>

                <div className="form-group full-width">
                  <label>Product Images</label>
                  <div className="image-upload-container">
                    <div className="image-preview-grid">
                      {previewImages.length > 0 ? (
                        previewImages.map((image, index) => (
                          <div key={index} className="preview-item">
                            <img src={image.preview} alt={`Preview ${index}`} />
                            <button type="button" className="remove-preview" onClick={() => handleRemovePreview(index)}>
                              <X size={16} />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="no-image">
                          <p>No images selected</p>
                        </div>
                      )}
                    </div>
                    <div className="upload-controls">
                      <label htmlFor="product-image" className="upload-btn">
                        <Upload size={16} />
                        Choose Images
                      </label>
                      <input
                        type="file"
                        id="product-image"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setIsAddProductModalOpen(false);
                    resetProductForm();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {isEditMode ? "Update Product" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PotteryDashboard;