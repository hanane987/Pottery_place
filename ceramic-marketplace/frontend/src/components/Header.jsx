"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, ShoppingCart, Heart } from "lucide-react"
import { toast } from "react-toastify"
import "../styles/Header.css"

const Header = ({ cart, setCart }) => {
  const navigate = useNavigate()
  const [isCartPopupVisible, setIsCartPopupVisible] = useState(false)

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId))
    toast.info("Product removed from cart")
  }

  const handleOrderClick = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Please log in to order")
      navigate("/login")
      return
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty")
      return
    }
    setIsCartPopupVisible(false)
    navigate("/reserve")
  }

  const formatPrice = (price) => (price === undefined ? "N/A" : `$${Number(price).toFixed(2)}`)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <header className="pottery-header">
      <div className="pottery-container">
        <nav className="pottery-nav">
          <div className="pottery-logo">
            <Link to="/" className="logo-link">
              <div className="logo-icon">
                <span className="pottery-wheel"></span>
              </div>
              <span className="logo-text">Artisan Pottery</span>
            </Link>
          </div>
          <div className="pottery-nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/shop" className="nav-link">
              Shop
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </div>
          <div className="pottery-nav-actions">
            <button aria-label="Search">
              <Search className="action-icon" />
            </button>
            <button aria-label="Favorites">
              <Heart className="action-icon" />
            </button>
            <button aria-label="Cart" onClick={() => setIsCartPopupVisible(true)}>
              <ShoppingCart className="action-icon" />
              <span className="cart-count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </button>
            {isCartPopupVisible && (
              <div className="cart-popup elegant-cart">
                <div className="cart-popup-content">
                  <div className="cart-header">
                    <h3>Your Selection</h3>
                    <button className="close-btn" onClick={() => setIsCartPopupVisible(false)}>
                      ×
                    </button>
                  </div>
                  <div className="cart-items">
                    {cart.length === 0 ? (
                      <div className="empty-cart">
                        <ShoppingCart size={48} />
                        <p>Your selection is empty</p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.productId} className="cart-item">
                          <div className="item-info">
                            <h4>{item.name}</h4>
                            <div className="item-details">
                              <span className="item-quantity">Qty: {item.quantity}</span>
                              <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          </div>
                          <button className="remove-btn" onClick={() => handleRemoveFromCart(item.productId)}>
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="cart-footer">
                    <div className="cart-total">
                      <span>Total:</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <button className="elegant-order-btn" onClick={handleOrderClick} disabled={cart.length === 0}>
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header

