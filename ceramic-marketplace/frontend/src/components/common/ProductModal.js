import { Upload, X } from "lucide-react";

const ProductModal = ({
  isAddProductModalOpen,
  setIsAddProductModalOpen,
  isEditMode,
  productFormData,
  setProductFormData,
  previewImages,
  setPreviewImages,
  handleProductFormChange,
  handleImageChange,
  handleRemovePreview,
  handleProductSubmit,
  resetProductForm,
  categories,
  artisans,
  vendorId,
}) => {
  return (
    <>
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
                    disabled
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
    </>
  );
};

export default ProductModal;