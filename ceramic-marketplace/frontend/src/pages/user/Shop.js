// pages/Shop.jsx or Index.jsx
"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { Search, ShoppingCart, Star } from 'lucide-react'
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "../../styles/Shop.css"

const Shop = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")
  const [inStock, setInStock] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/all`)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()

        let filteredProducts = data
        if (searchTerm) filteredProducts = filteredProducts.filter(p => String(p.nom || "").toLowerCase().includes(searchTerm.toLowerCase()))
        if (category) filteredProducts = filteredProducts.filter(p => String(p.categorie_id || "") === category)
        if (inStock) filteredProducts = filteredProducts.filter(p => p.etat === "disponible" && Number(p.quantite_stock) > 0)
        if (sortOrder === "asc") filteredProducts.sort((a, b) => Number(a.prix || 0) - Number(b.prix || 0))
        if (sortOrder === "desc") filteredProducts.sort((a, b) => Number(b.prix || 0) - Number(a.prix || 0))

        const productsPerPage = 8
        const startIndex = (currentPage - 1) * productsPerPage
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage)

        setProducts(paginatedProducts)
        setTotalPages(Math.ceil(filteredProducts.length / productsPerPage) || 1)
      } catch (error) {
        console.error("Error fetching products:", error)
        setProducts([])
      }
    }
    fetchProducts()
  }, [searchTerm, category, sortOrder, inStock, currentPage])

  const handleProductClick = (id) => navigate(`/product/${id}`)

  const isProductAvailable = (product) =>
    product.etat === "disponible" && Number(product.quantite_stock) > 0

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const handleAddToCart = (product) => {
    if (!localStorage.getItem("token")) {
      toast.info("Please register to add products to your cart")
      navigate("/register")
      return
    }

    const existingItem = cart.find(item => item.productId === product._id)
    if (existingItem) {
      setCart(cart.map(item => 
        item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ))
      toast.success(`${product.nom} quantity updated in cart`)
    } else {
      setCart([...cart, { productId: product._id, name: product.nom, quantity: 1, price: product.prix }])
      toast.success(`${product.nom} added to cart`)
    }
  }

  const formatPrice = (price) => price === undefined ? "N/A" : `$${price.toFixed(2)}`

  return (
    <div className="pottery-shop">
      <Header cart={cart} setCart={setCart} />

      <main className="pottery-main">
        <section className="pottery-filters">
          <div className="pottery-container">
            <div className="filters-wrapper">
              <div className="filter-search">
                <div className="search-input-wrapper">
                  <Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchTerm} 
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }} 
                  />
                </div>
                <label className="stock-checkbox">
                  <input 
                    type="checkbox" 
                    checked={inStock} 
                    onChange={() => { setInStock(!inStock); setCurrentPage(1) }} 
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
              <div className="filter-options">
                <div className="filter-group">
                  <label>Category</label>
                  <select value={category} onChange={(e) => { setCategory(e.target.value); setCurrentPage(1) }}>
                    <option value="">All Categories</option>
                    <option value="60b8d8f9e3c1f8c1d4e0e1a1">Vases</option>
                    <option value="60b8d8f9e3c1f8c1d4e0e1a4">Bowls</option>
                    <option value="60b8d8f9e3c1f8c1d4e0e1a2">Plates</option>
                    <option value="60b8d8f9e3c1f8c1d4e0e1a3">Mugs</option>
                    <option value="60b8d8f9e3c1f8c1d4e0e1a5">Decorative</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Sort by</label>
                  <select value={sortOrder} onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1) }}>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pottery-products">
          <div className="pottery-container">
            <div className="section-header">
              <h2 className="section-title">Artisan Collection</h2>
              <p className="product-count">{products.length} products</p>
            </div>
            <div className="products-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <article key={product._id} className="product-card">
                    <div className="product-image-wrapper" onClick={() => handleProductClick(product._id)}>
                      <img
                        src={product.images?.[0] ? `http://localhost:5000${product.images[0]}` : "/placeholder.svg?height=300&width=300"}
                        alt={product.nom}
                        className="product-image"
                      />
                      {isProductAvailable(product) ? (
                        <div className="stock-status-badge in-stock-badge">
                          In Stock ({product.quantite_stock})
                        </div>
                      ) : (
                        <div className="stock-status-badge sold-out-badge">Out of Stock</div>
                      )}
                      <div className="product-actions-overlay">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isProductAvailable(product)) {
                              handleAddToCart(product);
                            }
                          }}
                          className="add-to-cart-btn"
                          disabled={!isProductAvailable(product)}
                        >
                          {isProductAvailable(product) ? "Add to Cart" : "Out of Stock"}
                        </button>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="product-rating">
                        <Star size={14} className="star-icon filled" />
                        <Star size={14} className="star-icon filled" />
                        <Star size={14} className="star-icon filled" />
                        <Star size={14} className="star-icon filled" />
                        <Star size={14} className="star-icon" />
                        <span className="rating-count">(4.0)</span>
                      </div>
                      <h3 className="product-name" onClick={() => handleProductClick(product._id)}>
                        {product.nom}
                      </h3>
                      <p className="product-description">
                        {product.description
                          ? `${product.description.slice(0, 30)}${product.description.length > 30 ? "..." : ""}`
                          : "Handcrafted ceramic piece"}
                      </p>
                      <div className="product-footer">
                        <div className="product-price">{formatPrice(product.prix)}</div>
                        <button 
                          className="quick-cart-btn"
                          onClick={() => {
                            if (isProductAvailable(product)) {
                              handleAddToCart(product);
                            }
                          }}
                          disabled={!isProductAvailable(product)}
                        >
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="no-products-message">
                  <ShoppingCart size={48} />
                  <p>No products found</p>
                </div>
              )}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="page-nav prev-btn"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`page-btn ${page === currentPage ? "active" : ""}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="page-nav next-btn"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Shop