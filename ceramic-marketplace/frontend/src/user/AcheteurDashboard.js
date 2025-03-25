"use client"

import { useState } from "react"
import "../styles/pottery-shop.css"
import { Search, ShoppingCart, Heart, ArrowRight, Star, Instagram, Mail, ChevronRight, Play } from "lucide-react"

const PotteryLanding = () => {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault()
    console.log("Subscribed with email:", email)
    setEmail("")
    // Here you would typically call an API to handle the subscription
  }

  return (
    <div className="pottery-shop landing-page">
      {/* Header */}
      <header className="pottery-header">
        <div className="container">
          <nav className="main-nav">
            <div className="logo">
              <a href="/" className="logo-link">
                <div className="logo-symbol">
                  <span className="logo-circle"></span>
                </div>
                <span className="logo-text">Earthen Crafts</span>
              </a>
            </div>

            <div className="nav-menu">
              <a href="/" className="menu-link active">
                Home
              </a>
              <a href="/shop" className="menu-link">
                Shop
              </a>
              <a href="/collections" className="menu-link">
                Collections
              </a>
              <a href="/about" className="menu-link">
                Our Story
              </a>
              <a href="/contact" className="menu-link">
                Contact
              </a>
            </div>

            <div className="nav-controls">
              <button aria-label="Search" className="control-btn">
                <Search className="control-icon" />
              </button>
              <button aria-label="Favorites" className="control-btn">
                <Heart className="control-icon" />
              </button>
              <button aria-label="Cart" className="control-btn cart">
                <ShoppingCart className="control-icon" />
                <span className="cart-badge">0</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {/* Hero Section */}
        <section className="landing-hero">
          <div className="hero-wrapper">
            <img src="/placeholder.svg?height=800&width=1600" alt="Luxury Handcrafted Pottery" className="hero-img" />
            <div className="hero-gradient"></div>
          </div>

          <div className="container">
            <div className="landing-hero-content">
              <h1 className="landing-hero-title">
                Artisan Pottery
                <br />
                Handcrafted Excellence
              </h1>
              <p className="landing-hero-subtitle">Timeless pieces that blend tradition with contemporary design</p>
              <div className="hero-buttons">
                <a href="/shop" className="primary-btn">
                  Explore Collection
                  <ArrowRight size={16} />
                </a>
                <a href="/about" className="secondary-btn">
                  Our Story
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="featured-categories">
          <div className="container">
            <div className="section-intro">
              <h2 className="section-title">Curated Collections</h2>
              <p className="section-subtitle">Discover our handpicked selections of artisanal pottery</p>
            </div>

            <div className="categories-grid">
              <div className="category-card">
                <div className="category-image-container">
                  <img src="/placeholder.svg?height=500&width=400" alt="Vases Collection" className="category-image" />
                  <div className="category-overlay"></div>
                </div>
                <h3 className="category-title">Vases</h3>
                <a href="/shop/vases" className="category-link">
                  Explore <ChevronRight size={16} />
                </a>
              </div>

              <div className="category-card">
                <div className="category-image-container">
                  <img
                    src="/placeholder.svg?height=500&width=400"
                    alt="Tableware Collection"
                    className="category-image"
                  />
                  <div className="category-overlay"></div>
                </div>
                <h3 className="category-title">Tableware</h3>
                <a href="/shop/tableware" className="category-link">
                  Explore <ChevronRight size={16} />
                </a>
              </div>

              <div className="category-card">
                <div className="category-image-container">
                  <img src="/placeholder.svg?height=500&width=400" alt="Decorative Pieces" className="category-image" />
                  <div className="category-overlay"></div>
                </div>
                <h3 className="category-title">Decorative</h3>
                <a href="/shop/decorative" className="category-link">
                  Explore <ChevronRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="container">
            <div className="about-grid">
              <div className="about-content">
                <span className="content-label">Our Story</span>
                <h2 className="about-title">Crafting Beauty Since 1985</h2>
                <p className="about-text">
                  At Earthen Crafts, we believe in the timeless art of pottery making. Each piece is meticulously
                  handcrafted by our master artisans, combining traditional techniques with contemporary design
                  sensibilities.
                </p>
                <p className="about-text">
                  Our commitment to quality and sustainability ensures that every creation not only beautifies your
                  space but also honors the earth from which it came.
                </p>
                <a href="/about" className="text-link">
                  Learn more about our journey
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="about-image-container">
                <img src="/placeholder.svg?height=600&width=500" alt="Artisan at work" className="about-image" />
                <div className="video-button">
                  <Play size={24} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="featured-products">
          <div className="container">
            <div className="section-intro">
              <h2 className="section-title">Bestselling Pieces</h2>
              <p className="section-subtitle">Our most coveted creations, cherished in homes worldwide</p>
            </div>

            <div className="products-slider">
              {/* Product 1 */}
              <div className="product-slide">
                <div className="product-image-container">
                  <img src="/placeholder.svg?height=400&width=400" alt="Ceramic Vase" className="product-image" />
                  <div className="product-overlay">
                    <button className="cart-btn">Add to Cart</button>
                    <div className="action-buttons">
                      <button className="action-btn" title="Add to Wishlist">
                        <Heart size={18} />
                      </button>
                      <button className="action-btn" title="Quick View">
                        <Search size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">Handcrafted Ceramic Vase</h3>
                  <p className="product-pricing">$120.00</p>
                </div>
              </div>

              {/* Product 2 */}
              <div className="product-slide">
                <div className="product-image-container">
                  <img src="/placeholder.svg?height=400&width=400" alt="Stoneware Bowl Set" className="product-image" />
                  <div className="product-overlay">
                    <button className="cart-btn">Add to Cart</button>
                    <div className="action-buttons">
                      <button className="action-btn" title="Add to Wishlist">
                        <Heart size={18} />
                      </button>
                      <button className="action-btn" title="Quick View">
                        <Search size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">Stoneware Bowl Set</h3>
                  <p className="product-pricing">$85.00</p>
                </div>
              </div>

              {/* Product 3 */}
              <div className="product-slide">
                <div className="product-image-container">
                  <img src="/placeholder.svg?height=400&width=400" alt="Decorative Plate" className="product-image" />
                  <div className="product-overlay">
                    <button className="cart-btn">Add to Cart</button>
                    <div className="action-buttons">
                      <button className="action-btn" title="Add to Wishlist">
                        <Heart size={18} />
                      </button>
                      <button className="action-btn" title="Quick View">
                        <Search size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-title">Decorative Plate</h3>
                  <p className="product-pricing">$65.00</p>
                </div>
              </div>
            </div>

            <div className="view-all-container">
              <a href="/shop" className="primary-btn">
                View All Products
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* Craftsmanship Process */}
        <section className="process-section">
          <div className="container">
            <div className="section-intro">
              <h2 className="section-title">Our Craftsmanship</h2>
              <p className="section-subtitle">The meticulous journey from clay to masterpiece</p>
            </div>

            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">01</div>
                <h3 className="step-title">Material Selection</h3>
                <p className="step-description">
                  We source the finest clays and materials, prioritizing sustainability and quality.
                </p>
              </div>

              <div className="process-step">
                <div className="step-number">02</div>
                <h3 className="step-title">Wheel Throwing</h3>
                <p className="step-description">
                  Each piece is carefully shaped on the potter's wheel by our master artisans.
                </p>
              </div>

              <div className="process-step">
                <div className="step-number">03</div>
                <h3 className="step-title">Glazing</h3>
                <p className="step-description">
                  Unique glazes are applied by hand, creating distinctive finishes and colors.
                </p>
              </div>

              <div className="process-step">
                <div className="step-number">04</div>
                <h3 className="step-title">Firing</h3>
                <p className="step-description">
                  Pieces are kiln-fired at precise temperatures to ensure durability and beauty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials-section">
          <div className="container">
            <div className="section-intro">
              <h2 className="section-title">Client Testimonials</h2>
              <p className="section-subtitle">What our valued customers say about our creations</p>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#a67c52" color="#a67c52" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "The craftsmanship is exceptional. Each piece tells a story and has become a cherished part of our
                  home. Truly worth every penny."
                </p>
                <div className="testimonial-author">
                  <img src="/placeholder.svg?height=60&width=60" alt="Emily Johnson" className="author-image" />
                  <div className="author-info">
                    <h4 className="author-name">Emily Johnson</h4>
                    <p className="author-title">Interior Designer</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#a67c52" color="#a67c52" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "I've collected pottery for years, and Earthen Crafts stands out for their attention to detail and
                  unique designs. Absolutely stunning work."
                </p>
                <div className="testimonial-author">
                  <img src="/placeholder.svg?height=60&width=60" alt="Michael Chen" className="author-image" />
                  <div className="author-info">
                    <h4 className="author-name">Michael Chen</h4>
                    <p className="author-title">Art Collector</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#a67c52" color="#a67c52" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "The tableware set I purchased has elevated my dining experience. The quality is impeccable, and
                  guests always compliment the pieces."
                </p>
                <div className="testimonial-author">
                  <img src="/placeholder.svg?height=60&width=60" alt="Sophia Rodriguez" className="author-image" />
                  <div className="author-info">
                    <h4 className="author-name">Sophia Rodriguez</h4>
                    <p className="author-title">Chef & Restaurateur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Gallery */}
        <section className="instagram-section">
          <div className="container">
            <div className="section-intro">
              <h2 className="section-title">Follow Our Journey</h2>
              <p className="section-subtitle">
                Join our community on Instagram{" "}
                <a href="https://instagram.com/earthencrafts" className="instagram-handle">
                  @earthencrafts
                </a>
              </p>
            </div>

            <div className="instagram-grid">
              {[...Array(6)].map((_, i) => (
                <a href="https://instagram.com/earthencrafts" className="instagram-item" key={i}>
                  <img
                    src={`/placeholder.svg?height=300&width=300&text=Instagram+${i + 1}`}
                    alt="Instagram post"
                    className="instagram-image"
                  />
                  <div className="instagram-overlay">
                    <Instagram size={24} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter-section">
          <div className="container">
            <div className="newsletter-container">
              <div className="newsletter-content">
                <h2 className="newsletter-title">Join Our Community</h2>
                <p className="newsletter-text">
                  Subscribe to receive updates on new collections, artisan stories, and exclusive offers.
                </p>
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <div className="form-group">
                    <Mail size={20} className="input-icon" />
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="newsletter-input"
                    />
                  </div>
                  <button type="submit" className="newsletter-button">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h2 className="footer-logo">Earthen Crafts</h2>
              <p className="footer-slogan">Connecting tradition with modern living</p>
              <address className="footer-address">
                400 University Drive Suite 200
                <br />
                Coral Gables, FL 33134 USA
              </address>
            </div>

            <div className="footer-nav-container">
              <div className="footer-nav">
                <h3 className="footer-nav-title">Shop</h3>
                <ul className="footer-links">
                  <li>
                    <a href="/shop/new">New Arrivals</a>
                  </li>
                  <li>
                    <a href="/shop/bestsellers">Bestsellers</a>
                  </li>
                  <li>
                    <a href="/shop/sale">Sale Items</a>
                  </li>
                  <li>
                    <a href="/shop/collections">Collections</a>
                  </li>
                </ul>
              </div>

              <div className="footer-nav">
                <h3 className="footer-nav-title">Support</h3>
                <ul className="footer-links">
                  <li>
                    <a href="/shipping">Shipping</a>
                  </li>
                  <li>
                    <a href="/returns">Returns</a>
                  </li>
                  <li>
                    <a href="/faq">FAQ</a>
                  </li>
                  <li>
                    <a href="/contact">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-subscribe">
              <h3 className="footer-nav-title">Stay Connected</h3>
              <p className="subscribe-text">Follow us on social media for inspiration and updates.</p>

              <div className="social-links-large">
                <a href="#" className="social-link-large">
                  Instagram
                </a>
                <a href="#" className="social-link-large">
                  Facebook
                </a>
                <a href="#" className="social-link-large">
                  Pinterest
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">&copy; {new Date().getFullYear()} Earthen Crafts. All rights reserved.</div>

            <div className="footer-legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/accessibility">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PotteryLanding;

