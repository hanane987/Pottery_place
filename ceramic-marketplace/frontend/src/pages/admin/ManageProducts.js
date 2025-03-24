"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/ManageProducts.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import adminStyles from "../../styles/AdminDashboard.module.css";
import AdminSidebar from "../../components/common/AdminSidebar";

const ManageProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    nom: "",
    description: "",
    prix: "",
    quantite_stock: "",
    artisan_id: "",
    images: [],
    etat: "disponible",
  });
  const [loading, setLoading] = useState(true);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchArtisans();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/products/all");
      console.log("API Response:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtisans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/artisans");
      console.log("Artisans Response:", response.data);
      setArtisans(response.data);
    } catch (error) {
      console.error("Error fetching artisans:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
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

    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => formDataToSend.append("images", file));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      let response;
      if (formData.id) {
        response = await axios.put(`http://localhost:5000/api/products/${formData.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Product updated:", response.data);
      } else {
        response = await axios.post("http://localhost:5000/api/products", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Product created:", response.data);
      }

      setFormData({
        id: "",
        nom: "",
        description: "",
        prix: "",
        quantite_stock: "",
        artisan_id: "",
        images: [],
        etat: "disponible",
      });
      setPreviewImages([]);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (product) => {
    console.log("Editing product:", product);
    setFormData({
      id: product._id,
      nom: product.nom,
      description: product.description,
      prix: product.prix,
      quantite_stock: product.quantite_stock,
      artisan_id: product.artisan_id,
      images: [],
      etat: product.etat,
    });

    if (Array.isArray(product.images) && product.images.length > 0) {
      const previews = product.images.map((img) => ({
        file: null,
        preview: `http://localhost:5000${img}`,
      }));
      setPreviewImages(previews);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error.response ? error.response.data : error.message);
      }
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className={styles.dashboardContainer}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}

      <AdminSidebar />

      <div className={styles.container}>
        <h2>Manage Products</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="hidden" name="id" value={formData.id} />

          <div className={styles.sectionTitle}>Basic Information</div>

          <div className={styles.inputGroup}>
            <label>Product Name</label>
            <input
              type="text"
              name="nom"
              placeholder="Enter product name"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Price (€)</label>
            <input
              type="number"
              name="prix"
              placeholder="Enter price"
              value={formData.prix}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup} style={{ gridColumn: "span 2" }}>
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.sectionTitle}>Inventory & Classification</div>

          <div className={styles.inputGroup}>
            <label>Stock Quantity</label>
            <input
              type="number"
              name="quantite_stock"
              placeholder="Enter stock quantity"
              value={formData.quantite_stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Status</label>
            <select name="etat" value={formData.etat} onChange={handleChange}>
              <option value="disponible">Available</option>
              <option value="épuisé">Out of Stock</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Artisan</label>
            <select name="artisan_id" value={formData.artisan_id} onChange={handleChange} required>
              <option value="">Select Artisan</option>
              {artisans.map((artisan) => (
                <option key={artisan._id} value={artisan._id}>
                  {artisan.nom}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.sectionTitle}>Product Images</div>

          <div className={styles.dropZone}>
            <i className="fas fa-cloud-upload-alt"></i>
            <p>Drag & drop your images here or</p>
            <input
              type="file"
              name="images"
              id="product-images"
              multiple
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            <label htmlFor="product-images">
              <span>Browse Files</span>
            </label>
          </div>

          {previewImages.length > 0 && (
            <div className={styles.imagePreview}>
              {previewImages.map((image, index) => (
                <div key={index} className={styles.previewItem}>
                  <img src={image.preview} alt={`Preview ${index}`} />
                  <div className={styles.removePreview} onClick={() => handleRemovePreview(index)}>
                    <i className="fas fa-times"></i>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button type="submit" className={styles.submitButton}>
            {formData.id ? "Update Product" : "Save Product"}
          </button>
        </form>

        <h3>Product List</h3>

        {loading ? (
          <div className={styles.emptyState}>
            <i className="fas fa-spinner fa-spin"></i>
            <h4>Loading products...</h4>
          </div>
        ) : products.length === 0 ? (
          <div className={styles.emptyState}>
            <i className="fas fa-box-open"></i>
            <h4>No products found</h4>
            <p>Start by adding your first product using the form above.</p>
          </div>
        ) : (
          <ul className={styles.productList}>
            {products.map((product) => (
              <li
                key={product._id}
                className={styles.productItem}
                data-status={product.etat}
                onClick={(e) => {
                  if (!e.target.closest("button")) handleProductClick(product._id);
                }}
              >
                <img
                  src={
                    Array.isArray(product.images) && product.images.length > 0
                      ? `http://localhost:5000${product.images[0]}`
                      : "/placeholder.svg?height=200&width=300"
                  }
                  alt={product.nom}
                  className={styles.productImage}
                />
                <div className={styles.productDetails}>
                  <h4>{product.nom}</h4>
                  <p>{product.prix} €</p>
                  <div
                    className={`${styles.productStock} ${
                      product.etat === "disponible" ? styles.inStock : styles.outOfStock
                    }`}
                  >
                    <i
                      className={`fas ${
                        product.etat === "disponible" ? "fa-check-circle" : "fa-times-circle"
                      }`}
                    ></i>
                    {product.etat === "disponible"
                      ? `In Stock (${product.quantite_stock})`
                      : "Out of Stock"}
                  </div>
                  <div className={styles.buttonGroup}>
                    <button onClick={() => handleEdit(product)} className={styles.editButton}>
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button onClick={() => handleDelete(product._id)} className={styles.deleteButton}>
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;