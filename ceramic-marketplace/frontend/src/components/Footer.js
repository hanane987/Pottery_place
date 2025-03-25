// components/Footer.jsx
import "../styles/Home.css"

const Footer = () => {
  return (
    <footer className="pottery-footer">
      <div className="pottery-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo">Artisan Pottery</h2>
            <p className="footer-tagline">Handcrafted with passion since 1985</p>
            <address className="footer-address">
              400 University Drive Suite 200, Coral Gables, FL 33134 USA
            </address>
          </div>
          <div className="footer-links-container">
            <div className="footer-links">
              <h3 className="footer-heading">Quick Links</h3>
              <ul className="footer-nav">
                <li><a href="/">Home</a></li>
                <li><a href="/shop">Shop</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h3 className="footer-heading">Help</h3>
              <ul className="footer-nav">
                <li><a href="/shipping">Shipping</a></li>
                <li><a href="/returns">Returns & Exchanges</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-newsletter">
            <h3 className="footer-heading">Join Our Newsletter</h3>
            <p className="newsletter-text">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} Artisan Pottery. All rights reserved.
          </div>
          <div className="social-links">
            <a href="https://instagram.com" className="social-link" aria-label="Instagram">
              <span className="social-icon instagram"></span>
            </a>
            <a href="https://facebook.com" className="social-link" aria-label="Facebook">
              <span className="social-icon facebook"></span>
            </a>
            <a href="https://pinterest.com" className="social-link" aria-label="Pinterest">
              <span className="social-icon pinterest"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer