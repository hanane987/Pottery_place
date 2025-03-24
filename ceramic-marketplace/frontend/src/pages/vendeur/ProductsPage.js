import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import Sidebar from "../../components/common/Sidebar";
import TopNav from "../../components/common/TopNav";
import Footer from "../../components/common/Footer";
import ProductModal from "../../components/common/ProductModal";
import "../../styles/pottery-dashboard.css";

import { Search, Plus, Edit, Trash2 } from "lucide-react";

const ProductsPage = () => {
  const [vendorId, setVendorId] = useState(null);
  const [activeSection, setActiveSection] = useState("products");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
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
          <ProductModal
            isAddProductModalOpen={isAddProductModalOpen}
            setIsAddProductModalOpen={setIsAddProductModalOpen}
            isEditMode={isEditMode}
            productFormData={productFormData}
            setProductFormData={setProductFormData}
            previewImages={previewImages}
            setPreviewImages={setPreviewImages}
            handleProductFormChange={handleProductFormChange}
            handleImageChange={handleImageChange}
            handleRemovePreview={handleRemovePreview}
            handleProductSubmit={handleProductSubmit}
            resetProductForm={resetProductForm}
            categories={categories}
            artisans={artisans}
            vendorId={vendorId}
          />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default ProductsPage;