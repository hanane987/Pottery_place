import React from "react";
import "../styles/test.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Main() {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <div className="logo-icon"></div>
          <span className="logo-text">Pottery Haven</span>
        </div>
        <nav className="nav-menu">
          <Link to="/"  className="home">Home</Link>
          <Link to="/shop" className="shop-1">Shop</Link>
          <Link to="/about" className="about">About Us</Link>
          <Link to="/contact" className="contact">Contact</Link>
        </nav>
        <div className="header-icons">
          <div className="icon account-icon"></div>
          <div className="icon search-icon"></div>
          <div className="icon heart-icon"></div>
          <div className="icon cart-icon"></div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">New Arrival</span>
          <h1 className="hero-title">Explore Our Unique Pottery Collection</h1>
          <p className="hero-description">
            Discover handcrafted pottery that brings beauty and elegance to your home.
          </p>
          <button className="cta-button">SHOP NOW</button>
        </div>
      </section>

      {/* Browse Range Section */}
      <section className="browse-section">
        <h2 className="section-title">Browse Our Pottery Range</h2>
        <p className="section-description">
          From vases to dinnerware, find the perfect piece for your collection.
        </p>
        <div className="category-images">
          <div className="category-item">
            <div className="category-image dining-image"></div>
            <span className="category-name">Dining</span>
          </div>
          <div className="category-item">
            <div className="category-image living-image"></div>
            <span className="category-name">Living</span>
          </div>
          <div className="category-item">
            <div className="category-image bedroom-image"></div>
            <span className="category-name">Bedroom</span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <h2 className="section-title">Our Pottery Products</h2>
        <div className="products-grid">
          {/* Product 1 */}
          <div className="product-card">
            <div className="product-image product-1">
              <img src="https://picsum.photos/200/300?random=1" alt="Artisan Bowl" />
            </div>
            <div className="discount-tag">-30%</div>
            <div className="product-info">
              <h3 className="product-name">Artisan Bowl</h3>
              <p className="product-description">Handcrafted ceramic bowl</p>
              <div className="product-price">
                <span className="price">Rp 250.000</span>
                <span className="original-price">Rp 350.000</span>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="product-card">
            <div className="product-image product-2">
              <img src="https://picsum.photos/200/300?random=2" alt="Elegant Vase" />
            </div>
            <div className="product-hover">
              <button className="add-to-cart-btn">Add to cart</button>
              <div className="product-actions">
                <div className="action-item">
                  <div className="action-icon share-icon"></div>
                  <span>Share</span>
                </div>
                <div className="action-item">
                  <div className="action-icon compare-icon"></div>
                  <span>Compare</span>
                </div>
                <div className="action-item">
                  <div className="action-icon like-icon"></div>
                  <span>Like</span>
                </div>
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-name">Elegant Vase</h3>
              <p className="product-description">Stylish ceramic vase</p>
              <div className="product-price">
                <span className="price">Rp 300.000</span>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="product-card">
            <div className="product-image product-3">
              <img src="https://picsum.photos/200/300?random=3" alt="Luxury Pot" />
            </div>
            <div className="discount-tag">-50%</div>
            <div className="product-info">
              <h3 className="product-name">Luxury Pot</h3>
              <p className="product-description">Beautiful decorative pot</p>
              <div className="product-price">
                <span className="price">Rp 700.000</span>
                <span className="original-price">Rp 1.400.000</span>
              </div>
            </div>
          </div>

          {/* Product 4 */}
          <div className="product-card">
            <div className="product-image product-4">
              <img src="https://picsum.photos/200/300?random=4" alt="Garden Planter" />
            </div>
            <div className="new-tag">New</div>
            <div className="product-info">
              <h3 className="product-name">Garden Planter</h3>
              <p className="product-description">Outdoor ceramic planter</p>
              <div className="product-price">
                <span className="price">Rp 500.000</span>
              </div>
            </div>
          </div>

          {/* Product 5 */}
          <div className="product-card">
            <div className="product-image product-5">
              <img src="https://picsum.photos/200/300?random=5" alt="Night Lamp" />
            </div>
            <div className="product-info">
              <h3 className="product-name">Night Lamp</h3>
              <p className="product-description">Elegant ceramic night lamp</p>
              <div className="product-price">
                <span className="price">Rp 150.000</span>
              </div>
            </div>
          </div>

          {/* Product 6 */}
          <div className="product-card">
            <div className="product-image product-6">
              <img src="https://picsum.photos/200/300?random=6" alt="Mini Mug" />
            </div>
            <div className="new-tag">New</div>
            <div className="product-info">
              <h3 className="product-name">Mini Mug</h3>
              <p className="product-description">Cute ceramic mug</p>
              <div className="product-price">
                <span className="price">Rp 50.000</span>
              </div>
            </div>
          </div>

          {/* Product 7 */}
          <div className="product-card">
            <div className="product-image product-7">
              <img src="https://picsum.photos/200/300?random=7" alt="Bed Set" />
            </div>
            <div className="discount-tag">-50%</div>
            <div className="product-info">
              <h3 className="product-name">Bed Set</h3>
              <p className="product-description">Charming ceramic bed set</p>
              <div className="product-price">
                <span className="price">Rp 700.000</span>
                <span className="original-price">Rp 1.400.000</span>
              </div>
            </div>
          </div>

          {/* Product 8 */}
          <div className="product-card">
            <div className="product-image product-8">
              <img src="https://picsum.photos/200/300?random=8" alt="Flower Pot" />
            </div>
            <div className="new-tag">New</div>
            <div className="product-info">
              <h3 className="product-name">Flower Pot</h3>
              <p className="product-description">Minimalist ceramic flower pot</p>
              <div className="product-price">
                <span className="price">Rp 500.000</span>
              </div>
            </div>
          </div>
        </div>
        <button className="show-more-btn">Show More</button>
      </section>

      {/* Inspiration Section */}
      <section className="inspiration-section">
        <div className="inspiration-content">
          <div className="room-preview">
            <div className="room-info">
              <div className="room-number">
                <span>01</span>
                <div className="divider"></div>
                <span>Pottery Room</span>
              </div>
              <h3>Creative Space</h3>
            </div>
          </div>
          <div className="inspiration-text">
            <h2>Explore Beautiful Pottery Inspirations</h2>
            <p>Our artisans have crafted many beautiful pieces to inspire you.</p>
            <button className="explore-btn">Explore More</button>
            <div className="indicators">
              <div className="indicator active"></div>
              <div className="indicator"></div>
              <div className="indicator"></div>
              <div className="indicator"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="share-section">
        <h2>Share Your Pottery Setup with</h2>
        <h2 className="hashtag">#PotteryHaven</h2>
        <div className="gallery-images"></div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-column">
            <h3 className="footer-logo">Pottery Haven</h3>
            <p className="footer-address">
              400 Clay Avenue, Suite 200, <br />
              Pottery Town, PT 12345 USA
            </p>
          </div>
          <div className="footer-column">
            <h4>Links</h4>
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-column">
            <h4>Help</h4>
            <a href="#">Payment Options</a>
            <a href="#">Returns</a>
            <a href="#">Privacy Policies</a>
          </div>
          <div className="footer-column">
            <h4>Newsletter</h4>
            <div className="newsletter-form">
              <input type="text" placeholder="Enter Your Email Address" />
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>2023 Pottery Haven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}