import { useState, useEffect } from "react";
import "../styles/Shop.css";
import { Search, Tag, ShoppingCart, Heart, GitCompare, PlusCircle } from "lucide-react"; 

const Index = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [inStock, setInStock] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products?search=${searchTerm}&category=${category}&sort=${sortOrder}&inStock=${inStock}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
        
        const calculatedTotalPages = Math.ceil(data.length / 8);
        setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [searchTerm, category, sortOrder, inStock]);

  const handleProductClick = (id) => {
    console.log(`Navigate to product details: /product/${id}`);
  };

  const formatPrice = (price) => {
    if (price === undefined) return "N/A"; 
    return `Rp ${price.toLocaleString()}`;
  };

  return (
    <div className="shop-page">
      <header className="header">
        <nav className="nav-container">
          <div className="logo-container">
            <a href="/" className="logo-link">
              <img
                src="https://cdn.example.com/logo.png"
                alt="Marketplace Logo"
                className="logo-image"
              />
              <span className="logo-text">Marketplace</span>
            </a>
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link active">Home</a>
            <a href="/shop" className="nav-link">Shop</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/contact" className="nav-link">Contact</a>
          </div>
          <div className="nav-icons">
            <button aria-label="Account" className="icon-button">
              <img
                src="https://cdn.example.com/account-icon.png"
                alt=""
                className="nav-icon"
              />
            </button>
            <button aria-label="Search" className="icon-button">
              <Search className="nav-icon" />
            </button>
            <button aria-label="Favorites" className="icon-button">
              <Heart className="nav-icon" />
            </button>
            <button aria-label="Cart" className="icon-button">
              <ShoppingCart className="nav-icon" />
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="shop-hero">
          <img
            src="https://cdn.example.com/shop-banner.png"
            alt="Marketplace Banner"
            className="hero-image"
          />
          <div className="hero-content">
            <h1 className="hero-title">Marketplace</h1>
            <div className="breadcrumb">
              <span className="breadcrumb-home">Home</span>
              <img
                src="https://cdn.example.com/breadcrumb-arrow.png"
                alt=""
                className="breadcrumb-arrow"
              />
              <span className="breadcrumb-current">Shop</span>
            </div>
          </div>
        </section>

        <section className="filter-bar">
          <div className="filter-left">
            <div className="search-input">
              <input 
                type="text" 
                placeholder="Search by name or description" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-search" 
              />
              <Search size={20} className="search-icon" />
            </div>
            <div className="view-options">
              <label className="stock-filter">
                <input 
                  type="checkbox" 
                  checked={inStock} 
                  onChange={() => setInStock(!inStock)} 
                />
                In Stock Only
              </label>
            </div>
          </div>
          <div className="filter-right">
            <label className="filter-label">Category</label>
            <select 
              className="filter-select category-select" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
              <option value="Category 4">Category 4</option>
            </select>
            <label className="filter-label">Sort by</label>
            <select 
              className="filter-select sort-select"
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </section>

        <section className="product-grid-section">
          <div className="product-grid-container">
            <h2 className="featured-title">Featured Products</h2>
            <div className="product-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <article 
                    key={product._id} 
                    className="product-card"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <div className="product-image-container">
                      <img 
                        src={Array.isArray(product.images) && product.images.length > 0 
                          ? `http://localhost:5000${product.images[0]}`
                          : 'https://cdn.example.com/random-pottery-image.png'} 
                        alt={product.nom} 
                        className="product-image" 
                      />
                      {product.oldPrice && (
                        <div className="product-badge discount-red">
                          {Math.round((product.oldPrice - product.price) / product.oldPrice * 100)}%
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="product-badge out-of-stock">
                          Out of Stock
                        </div>
                      )}
                      <div className="product-overlay">
                        <div className="product-overlay-content">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log(`Add to cart: ${product.nom}`);
                            }}
                            className="add-to-cart-button"
                            disabled={!product.inStock}
                          >
                            Add to cart
                          </button>
                          <div className="product-actions">
                            <button className="action-button">
                              <PlusCircle className="action-icon" />
                              <span>Add to Favorites</span>
                            </button>
                            <button className="action-button">
                              <GitCompare className="action-icon" />
                              <span>Compare</span>
                            </button>
                            <button className="action-button">
                              <Heart className="action-icon" />
                              <span>Like</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">
                        <Tag size={16} className="product-tag-icon" /> {product.nom}
                      </h3>
                      <p className="product-description">
                        {product.description.length > 50
                          ? `${product.description.slice(0, 50)}...`
                          : product.description}
                      </p>
                      <div className="product-price-container">
                        <span className="product-price">
                          {product.price !== undefined ? formatPrice(product.price) : "N/A"}
                        </span>
                        {product.oldPrice && (
                          <span className="product-old-price">{formatPrice(product.oldPrice)}</span>
                        )}
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p className="no-products">No products found matching your criteria.</p>
              )}
            </div>
          </div>
        </section>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`page-button ${page === currentPage ? "active" : ""}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            className="next-button"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <section className="features-section">
          <div className="features-container">
            <div className="feature-item">
              <img
                src="https://cdn.example.com/high-quality-icon.png"
                alt=""
                className="feature-icon"
              />
              <div className="feature-content">
                <h3 className="feature-title">High Quality</h3>
                <p className="feature-description">handcrafted pottery</p>
              </div>
            </div>
            <div className="feature-item">
              <img
                src="https://cdn.example.com/warranty-icon.png"
                alt=""
                className="feature-icon"
              />
              <div className="feature-content">
                <h3 className="feature-title">Warranty Protection</h3>
                <p className="feature-description">Over 2 years</p>
              </div>
            </div>
            <div className="feature-item">
              <img
                src="https://cdn.example.com/free-shipping-icon.png"
                alt=""
                className="feature-icon"
              />
              <div className="feature-content">
                <h3 className="feature-title">Free Shipping</h3>
                <p className="feature-description">Order over 150 $</p>
              </div>
            </div>
            <div className="feature-item">
              <img
                src="https://cdn.example.com/support-icon.png"
                alt=""
                className="feature-icon"
              />
              <div className="feature-content">
                <h3 className="feature-title">24 / 7 Support</h3>
                <p className="feature-description">Dedicated support</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <h2 className="footer-logo">Pottery.</h2>
            <address className="footer-address">
              400 University Drive Suite 200 Coral Gables,
              <br />
              FL 33134 USA
            </address>
          </div>

          <nav className="footer-links">
            <h3 className="footer-heading">Links</h3>
            <ul className="footer-list">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/shop" className="footer-link">Shop</a></li>
              <li><a href="/about" className="footer-link">About</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </nav>

          <div className="footer-help-newsletter">
            <div className="footer-help">
              <h3 className="footer-heading">Help</h3>
              <ul className="footer-list">
                <li><a href="/payment" className="footer-link">Payment Options</a></li>
                <li><a href="/returns" className="footer-link">Returns</a></li>
                <li><a href="/privacy" className="footer-link">Privacy Policies</a></li>
              </ul>
            </div>
            <div className="footer-newsletter">
              <h3 className="footer-heading">Newsletter</h3>
              <form className="newsletter-form">
                <div className="newsletter-input-container">
                  <input
                    type="email"
                    placeholder="Enter Your Email Address"
                    className="newsletter-input"
                  />
                </div>
                <button type="submit" className="newsletter-button">
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-copyright">
          &copy; 2025 Pottery Marketplace | Follow us on social media!
        </div>
      </footer>
    </div>
  );
};

export default Index;