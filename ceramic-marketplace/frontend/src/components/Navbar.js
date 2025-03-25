import { Search, Heart, ShoppingCart } from "lucide-react"
import "../styles/Navbar.css"

const Navbar = () => {
  return (
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
  )
}

export default Navbar

