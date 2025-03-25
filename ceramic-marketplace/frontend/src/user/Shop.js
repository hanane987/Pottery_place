"use client"

import { useState, useEffect } from "react"
import "../styles/Shop.css"
import {
  Search,
  Tag,
  ShoppingCart,
  Heart,
  GitCompare,
  PlusCircle,
  CheckCircle2,
  ShieldCheck,
  Truck,
  HeadphonesIcon,
  ChevronRight,
} from "lucide-react"
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const Index = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")
  const [inStock, setInStock] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(3)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products?search=${searchTerm}&category=${category}&sort=${sortOrder}&inStock=${inStock}`,
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        setProducts(data)

        const calculatedTotalPages = Math.ceil(data.length / 8)
        setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1)
      } catch (error) {
        console.error("Error fetching products:", error)
        // For demo purposes, create mock data if API fails
        const mockProducts = Array.from({ length: 8 }, (_, i) => ({
          _id: `product-${i + 1}`,
          nom: `Handcrafted Pottery ${i + 1}`,
          description: `Beautiful handcrafted pottery item with unique design and premium quality materials.`,
          price: Math.floor(Math.random() * 200) + 50,
          oldPrice: Math.random() > 0.5 ? Math.floor(Math.random() * 300) + 100 : undefined,
          inStock: Math.random() > 0.2,
          images: ["/placeholder.svg?height=300&width=300"],
        }))
        setProducts(mockProducts)

        const calculatedTotalPages = Math.ceil(mockProducts.length / 8)
        setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1)
      }
    }

    fetchProducts()
  }, [searchTerm, category, sortOrder, inStock])

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Use navigate to redirect
  };

  const formatPrice = (price) => {
    if (price === undefined) return "N/A"
    return `Rp ${price.toLocaleString()}`
  }

  return (
    <div className="pottery-shop">
      <header className="pottery-header">
        <div className="pottery-container">
          <nav className="pottery-nav">
            <div className="pottery-logo">
              <a href="/" className="logo-link">
                <div className="logo-icon">
                  <span className="pottery-wheel"></span>
                </div>
                <span className="logo-text">Artisan Pottery</span>
              </a>
            </div>

            <div className="pottery-nav-links">
              <a href="/" className="nav-link active">
                Home
              </a>
              <a href="/shop" className="nav-link">
                Shop
              </a>
              <a href="/about" className="nav-link">
                About
              </a>
              <a href="/contact" className="nav-link">
                Contact
              </a>
            </div>

            <div className="pottery-nav-actions">
              <button aria-label="Search" className="action-button">
                <Search className="action-icon" />
              </button>
              <button aria-label="Favorites" className="action-button">
                <Heart className="action-icon" />
              </button>
              <button aria-label="Cart" className="action-button">
                <ShoppingCart className="action-icon" />
                <span className="cart-count">0</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="pottery-main">
        <section className="pottery-hero">
          <div className="hero-image-container">
            <img
              src="/placeholder.svg?height=600&width=1600"
              alt="Handcrafted Pottery Collection"
              className="hero-image"
            />
            <div className="hero-overlay"></div>
          </div>

          <div className="pottery-container">
            <div className="hero-content">
              <h1 className="hero-title">Handcrafted Pottery</h1>
              <p className="hero-subtitle">Unique pieces made with passion and tradition</p>
              <div className="breadcrumb">
                <a href="/" className="breadcrumb-link">
                  Home
                </a>
                <ChevronRight className="breadcrumb-separator" size={14} />
                <span className="breadcrumb-current">Shop</span>
              </div>
            </div>
          </div>
        </section>

        <section className="pottery-filters">
          <div className="pottery-container">
            <div className="filters-wrapper">
              <div className="filter-search">
                <div className="search-input-wrapper">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search handcrafted pottery..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                <label className="stock-filter">
                  <input type="checkbox" checked={inStock} onChange={() => setInStock(!inStock)} />
                  <span className="checkbox-label">In Stock Only</span>
                </label>
              </div>

              <div className="filter-options">
                <div className="filter-group">
                  <label className="filter-label">Category</label>
                  <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="Vases">Vases</option>
                    <option value="Bowls">Bowls</option>
                    <option value="Plates">Plates</option>
                    <option value="Mugs">Mugs</option>
                    <option value="Decorative">Decorative</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">Sort by</label>
                  <select className="filter-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pottery-products">
          <div className="pottery-container">
            <h2 className="section-title">
              <span className="title-decoration"></span>
              Artisan Collection
              <span className="title-decoration"></span>
            </h2>

            <div className="products-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <article key={product._id} className="product-card" onClick={() => handleProductClick(product._id)}>
                    <div className="product-image-wrapper">
                      <img
                        src={
                          Array.isArray(product.images) && product.images.length > 0
                            ? `http://localhost:5000${product.images[0]}`
                            : "/placeholder.svg?height=300&width=300"
                        }
                        alt={product.nom}
                        className="product-image"
                      />

                      {product.oldPrice && <div className="product-badge sale">Sale</div>}

                      {!product.inStock && <div className="product-badge sold-out">Sold Out</div>}

                      <div className="product-actions-overlay">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log(`Add to cart: ${product.nom}`)
                          }}
                          className="add-to-cart-btn"
                          disabled={!product.inStock}
                        >
                          {product.inStock ? "Add to Cart" : "Sold Out"}
                        </button>

                        <div className="quick-actions">
                          <button
                            className="quick-action-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              console.log(`Add to wishlist: ${product.nom}`)
                            }}
                            title="Add to Wishlist"
                          >
                            <Heart size={18} />
                          </button>

                          <button
                            className="quick-action-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              console.log(`Compare: ${product.nom}`)
                            }}
                            title="Compare"
                          >
                            <GitCompare size={18} />
                          </button>

                          <button
                            className="quick-action-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              console.log(`Quick view: ${product.nom}`)
                            }}
                            title="Quick View"
                          >
                            <PlusCircle size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="product-details">
                      <div className="product-category">
                        <Tag size={14} />
                        <span>{product.category || "Pottery"}</span>
                      </div>

                      <h3 className="product-name">{product.nom}</h3>

                      <p className="product-description">
                        {product.description && product.description.length > 50
                          ? `${product.description.slice(0, 50)}...`
                          : product.description || "Handcrafted with care and attention to detail."}
                      </p>

                      <div className="product-price">
                        {product.oldPrice && <span className="old-price">{formatPrice(product.oldPrice)}</span>}
                        <span className="current-price">
                          {product.price !== undefined ? formatPrice(product.price) : "N/A"}
                        </span>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="no-products-message">
                  <div className="message-icon">
                    <span className="pottery-icon"></span>
                  </div>
                  <h3>No products found</h3>
                  <p>We couldn't find any products matching your criteria.</p>
                </div>
              )}
            </div>

            <div className="pagination">
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
                className="next-btn"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <section className="pottery-features">
          <div className="pottery-container">
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <CheckCircle2 />
                </div>
                <div className="feature-content">
                  <h3>Handcrafted Quality</h3>
                  <p>Every piece is unique and made with care</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <ShieldCheck />
                </div>
                <div className="feature-content">
                  <h3>2-Year Warranty</h3>
                  <p>We stand behind our craftsmanship</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <Truck />
                </div>
                <div className="feature-content">
                  <h3>Free Shipping</h3>
                  <p>On orders over $150</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <HeadphonesIcon />
                </div>
                <div className="feature-content">
                  <h3>Dedicated Support</h3>
                  <p>Available 7 days a week</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pottery-footer">
        <div className="pottery-container">
          <div className="footer-content">
            <div className="footer-brand">
              <h2 className="footer-logo">Artisan Pottery</h2>
              <p className="footer-tagline">Handcrafted with passion since 1985</p>
              <address className="footer-address">
                400 University Drive Suite 200
                <br />
                Coral Gables, FL 33134 USA
              </address>
            </div>

            <div className="footer-links-container">
              <div className="footer-links">
                <h3 className="footer-heading">Quick Links</h3>
                <ul className="footer-nav">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/shop">Shop</a>
                  </li>
                  <li>
                    <a href="/about">About Us</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </div>

              <div className="footer-links">
                <h3 className="footer-heading">Help</h3>
                <ul className="footer-nav">
                  <li>
                    <a href="/shipping">Shipping</a>
                  </li>
                  <li>
                    <a href="/returns">Returns & Exchanges</a>
                  </li>
                  <li>
                    <a href="/faq">FAQ</a>
                  </li>
                  <li>
                    <a href="/privacy">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-newsletter">
              <h3 className="footer-heading">Join Our Newsletter</h3>
              <p className="newsletter-text">Subscribe to receive updates, access to exclusive deals, and more.</p>

              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" className="newsletter-input" required />
                <button type="submit" className="newsletter-button">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">&copy; {new Date().getFullYear()} Artisan Pottery. All rights reserved.</div>

            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <span className="social-icon instagram"></span>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <span className="social-icon facebook"></span>
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <span className="social-icon pinterest"></span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


export default Index;