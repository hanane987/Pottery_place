"use client"

import { useState, useEffect } from "react"
import {
  ChevronRight,
  Search,
  Heart,
  ShoppingCart,
  MapPin,
  Phone,
  Clock,
  Award,
  CheckCircle,
  Package,
  Headphones,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { jwtDecode } from "jwt-decode"
import "../../styles/Contact.css"
import Footer from "../../components/Footer"

const Contact = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || [])
  const [isCartPopupVisible, setIsCartPopupVisible] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUserId(decoded.userId)
      } catch (error) {
        console.error("Error decoding token:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId))
    toast.info("Product removed from cart")
  }

  const handleReserve = async () => {
    if (!userId) {
      toast.error("Please log in to reserve")
      return
    }
    try {
      const response = await fetch("http://localhost:5000/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ userId, items: cart }),
      })
      if (!response.ok) throw new Error("Failed to reserve products")
      const data = await response.json()
      toast.success(data.message)
      setCart([])
      localStorage.removeItem("cart")
      setIsCartPopupVisible(false)
      navigate("/reserve")
    } catch (error) {
      toast.error(error.message)
    }
  }

  const formatPrice = (price) => (price === undefined ? "N/A" : `$${Number(price).toFixed(2)}`)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Message sent successfully!")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        toast.error("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      toast.error("An error occurred. Please try again later.")
    }
  }

  return (
    <div className="pottery-shop">
      {/* Header with Navigation - Same as About page */}
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
              <a href="/" className="nav-link">
                Home
              </a>
              <a href="/shop" className="nav-link">
                Shop
              </a>
              <a href="/about" className="nav-link">
                About
              </a>
              <a href="/contact" className="nav-link active">
                Contact
              </a>
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
                <CartPopup
                  items={cart}
                  onClose={() => setIsCartPopupVisible(false)}
                  onReserve={handleReserve}
                  onRemove={handleRemoveFromCart}
                />
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="pottery-main contact-page">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="hero-image-container">
            <img src="/images/FIL9.jpg" alt="Contact Us" className="hero-image" />
            <div className="hero-overlay"></div>
          </div>

          <div className="pottery-container">
            <div className="hero-content">
              <h1 className="hero-title">Contact Us</h1>
              <p className="hero-subtitle">We'd love to hear from you</p>
              <div className="breadcrumb">
                <a href="/" className="breadcrumb-link">
                  Home
                </a>
                <ChevronRight className="breadcrumb-separator" size={14} />
                <span className="breadcrumb-current">Contact</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-section">
          <div className="pottery-container">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-decoration"></span>
                Get In Touch With Us
                <span className="title-decoration"></span>
              </h2>
              <p className="section-subtitle">
                For more information about our products & services, please feel free to drop us an email. Our staff will
                always be there to help you out. Do not hesitate!
              </p>
            </div>

            <div className="contact-container">
              <div className="contact-info">
                <div className="info-item">
                  <div className="info-icon">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="info-title">Address</h3>
                    <p className="info-text">
                      400 University Drive Suite 200
                      <br />
                      Coral Gables, FL 33134 USA
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="info-title">Phone</h3>
                    <p className="info-text">
                      Mobile: (305) 555-6789
                      <br />
                      Hotline: (305) 456-6789
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="info-title">Working Time</h3>
                    <p className="info-text">
                      Monday-Friday: 9:00 - 22:00
                      <br />
                      Saturday-Sunday: 9:00 - 21:00
                    </p>
                  </div>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject (optional)"
                    className="form-input"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    placeholder="Hi! I'd like to ask about..."
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="features-section">
          <div className="pottery-container">
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <Award size={36} />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">High Quality</h3>
                  <p className="feature-text">Crafted from top materials</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <CheckCircle size={36} />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Warranty Protection</h3>
                  <p className="feature-text">Over 2 years</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <Package size={36} />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">Free Shipping</h3>
                  <p className="feature-text">Order over $150</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <Headphones size={36} />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">24 / 7 Support</h3>
                  <p className="feature-text">Dedicated support</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Cart Popup Component
const CartPopup = ({ items, onClose, onReserve, onRemove }) => {
  const formatPrice = (price) => (price === undefined ? "N/A" : `$${Number(price).toFixed(2)}`)

  return (
    <div className="cart-popup">
      <div className="cart-popup-content">
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingCart size={48} />
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.productId} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <div className="item-details">
                    <span className="item-quantity">Qty: {item.quantity}</span>
                    <span className="item-price">{formatPrice(item.price)}</span>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => onRemove(item.productId)}>
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>{formatPrice(items.reduce((sum, item) => sum + item.price * item.quantity, 0))}</span>
          </div>
          <button className="reserve-btn" onClick={onReserve} disabled={items.length === 0}>
            Reserve Items
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact

