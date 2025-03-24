"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import "../../styles/product-detail.css"
import {
  Search,
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  ChevronRight,
  ChevronLeft,
  Truck,
  ShieldCheck,
  RefreshCw,
  Tag,
} from "lucide-react"
import { toast } from "react-toastify"
import { jwtDecode } from "jwt-decode"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || [])
  const [userId, setUserId] = useState(null)
  const [isCartPopupVisible, setIsCartPopupVisible] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUserId(decoded.id)
      } catch (error) {
        console.error("Error decoding token:", error)
        toast.error("Invalid token. Please log in again.")
        navigate("/login")
      }
    }
  }, [navigate])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        setProduct(data)
        fetchRelatedProducts(data.categorie_id)
      } catch (error) {
        console.error("Error fetching product:", error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    const fetchRelatedProducts = async (categoryId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?category=${categoryId}&limit=4`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        setRelatedProducts(data.filter((item) => item._id !== id).slice(0, 4))
      } catch (error) {
        console.error("Error fetching related products:", error)
        setRelatedProducts([])
      }
    }

    if (id) fetchProduct()
  }, [id])

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount
    if (newQuantity >= 1 && newQuantity <= (product?.quantite_stock || Infinity)) {
      setQuantity(newQuantity)
    } else if (newQuantity > product.quantite_stock) {
      toast.error(`Only ${product.quantite_stock} items available in stock`)
    }
  }

  const handleAddToCart = () => {
    if (!product || product.quantite_stock < quantity) {
      toast.error(`Insufficient stock. Only ${product.quantite_stock} items available`)
      return
    }

    const existingItem = cart.find((item) => item.productId === product._id)
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity
      if (newQuantity > product.quantite_stock) {
        toast.error(`Cannot add more. Only ${product.quantite_stock} items available`)
        return
      }
      setCart(
        cart.map((item) =>
          item.productId === product._id ? { ...item, quantity: newQuantity } : item
        )
      )
      toast.success(`${product.nom} quantity updated in cart`)
    } else {
      setCart([
        ...cart,
        {
          productId: product._id,
          name: product.nom,
          quantity,
          price: product.prix,
          vendorId: product.artisan_id || "default_vendor_id",
        },
      ])
      toast.success(`${product.nom} added to cart`)
    }
  }

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId))
    toast.info("Product removed from cart")
  }

  const formatPrice = (price) => (price === undefined ? "N/A" : `$${Number(price).toFixed(2)}`)

  const getCategoryName = (categoryId) => {
    const categories = {
      "60b8d8f9e3c1f8c1d4e0e1a1": "Vases",
      "60b8d8f9e3c1f8c1d4e0e1a2": "Tableware",
      "60b8d8f9e3c1f8c1d4e0e1a3": "Pots",
      "60b8d8f9e3c1f8c1d4e0e1a4": "Bowls",
      "60b8d8f9e3c1f8c1d4e0e1a5": "Decorative",
    }
    return categories[categoryId] || "Pottery"
  }

  if (loading)
    return (
      <div className="pottery-shop">
        <div>Loading...</div>
      </div>
    )
  if (!product)
    return (
      <div className="pottery-shop">
        <div>Product Not Found</div>
      </div>
    )

  return (
    <div className="pottery-shop">
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
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/shop" className="nav-link active">Shop</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>
            <div className="pottery-nav-actions">
              <button aria-label="Search"><Search className="action-icon" /></button>
              <button aria-label="Favorites"><Heart className="action-icon" /></button>
              <button aria-label="Cart" onClick={() => setIsCartPopupVisible(true)}>
                <ShoppingCart className="action-icon" />
                <span className="cart-count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </button>
              {isCartPopupVisible && (
                <CartPopup
                  items={cart}
                  onClose={() => setIsCartPopupVisible(false)}
                  onRemove={handleRemoveFromCart}
                  navigate={navigate}
                  userId={userId}
                />
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="pottery-main">
        <div className="pottery-container">
          <div className="breadcrumb-container">
            <div className="breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <ChevronRight className="breadcrumb-separator" size={14} />
              <Link to="/shop" className="breadcrumb-link">Shop</Link>
              <ChevronRight className="breadcrumb-separator" size={14} />
              <Link to={`/shop/category/${product.categorie_id}`} className="breadcrumb-link">
                {getCategoryName(product.categorie_id)}
              </Link>
              <ChevronRight className="breadcrumb-separator" size={14} />
              <span className="breadcrumb-current">{product.nom}</span>
            </div>
          </div>

          <div className="product-detail-container">
            <div className="product-gallery">
              <div className="main-image-container">
                <button
                  className="gallery-nav prev"
                  onClick={() => setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                  disabled={product.images.length <= 1}
                >
                  <ChevronLeft size={24} />
                </button>
                <img
                  src={product.images[activeImage] || "/placeholder.svg?height=600&width=600"}
                  alt={product.nom}
                  className="main-image"
                />
                <button
                  className="gallery-nav next"
                  onClick={() => setActiveImage((prev) => (prev + 1) % product.images.length)}
                  disabled={product.images.length <= 1}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              <div className="thumbnail-container">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${activeImage === index ? "active" : ""}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={image || "/placeholder.svg"} alt={`${product.nom} - View ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="product-info">
              <div className="product-category-tag">
                <Tag size={14} />
                <span>{getCategoryName(product.categorie_id)}</span>
              </div>
              <h1 className="product-title">{product.nom}</h1>
              <div className="product-price-container">
                <span className="product-price">{formatPrice(product.prix)}</span>
              </div>
              <div className="product-short-description">
                <p>{product.description.substring(0, 150)}...</p>
              </div>
              <div className="product-meta">
                <div className="meta-item">
                  <span className="meta-label">Availability:</span>
                  <span className={`meta-value ${product.quantite_stock > 0 ? "in-stock" : "out-of-stock"}`}>
                    {product.quantite_stock > 0 ? `In Stock (${product.quantite_stock} items)` : "Out of Stock"}
                  </span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Artisan:</span>
                  <span className="meta-value">{product.artisan_id ? "Vendor Available" : "Artisan Pottery"}</span>
                </div>
              </div>
              <div className="product-actions">
                <div className="quantity-selector">
                  <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = Number.parseInt(e.target.value) || 1
                      if (val <= product.quantite_stock) setQuantity(Math.max(1, val))
                      else toast.error(`Maximum available: ${product.quantite_stock}`)
                    }}
                    min="1"
                    max={product.quantite_stock}
                  />
                  <button onClick={() => handleQuantityChange(1)} disabled={quantity >= product.quantite_stock}>
                    <Plus size={16} />
                  </button>
                </div>
                <button onClick={handleAddToCart} disabled={product.quantite_stock <= 0}>
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>
              <div className="product-benefits">
                <div className="benefit-item">
                  <Truck size={18} />
                  <span>Free shipping on orders over $150</span>
                </div>
                <div className="benefit-item">
                  <ShieldCheck size={18} />
                  <span>2-year warranty on all products</span>
                </div>
                <div className="benefit-item">
                  <RefreshCw size={18} />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>

          <section className="related-products">
            <h2>Related Products</h2>
            <div className="related-products-grid">
              {relatedProducts.map((product) => (
                <article key={product._id} className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
                  <img src={product.images?.[0] || "/placeholder.svg?height=300&width=300"} alt={product.nom} />
                  <div className="product-details">
                    <h3>{product.nom}</h3>
                    <div>{formatPrice(product.prix)}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="pottery-footer">
        <div className="pottery-container">
          <div className="footer-content">
            <div className="footer-brand">
              <h2 className="footer-logo">Artisan Pottery</h2>
              <p className="footer-tagline">Handcrafted with passion since 1985</p>
              <address className="footer-address">400 University Drive Suite 200, Coral Gables, FL 33134 USA</address>
            </div>
            <div className="footer-links-container">
              <div className="footer-links">
                <h3 className="footer-heading">Quick Links</h3>
                <ul className="footer-nav">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/shop">Shop</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
              <div className="footer-links">
                <h3 className="footer-heading">Help</h3>
                <ul className="footer-nav">
                  <li><Link to="/shipping">Shipping</Link></li>
                  <li><Link to="/returns">Returns & Exchanges</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                  <li><Link to="/privacy">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="footer-newsletter">
              <h3 className="footer-heading">Join Our Newsletter</h3>
              <p className="newsletter-text">Subscribe to receive updates, access to exclusive deals, and more.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" className="newsletter-input" required />
                <button type="submit" className="newsletter-button">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="copyright">© {new Date().getFullYear()} Artisan Pottery. All rights reserved.</div>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram"><span className="social-icon instagram"></span></a>
              <a href="#" className="social-link" aria-label="Facebook"><span className="social-icon facebook"></span></a>
              <a href="#" className="social-link" aria-label="Pinterest"><span className="social-icon pinterest"></span></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const CartPopup = ({ items, onClose, onRemove, navigate, userId }) => {
  const formatPrice = (price) => (price === undefined ? "N/A" : `$${Number(price).toFixed(2)}`)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleReserveClick = () => {
    if (!userId) {
      toast.error("Please log in to reserve")
      navigate("/login")
      return
    }
    if (items.length === 0) {
      toast.error("Your cart is empty")
      return
    }
    onClose()
    navigate("/reserve")
  }

  return (
    <div className="cart-popup">
      <div className="cart-popup-content">
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="close-btn" onClick={onClose}>×</button>
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
                    <span className="item-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => onRemove(item.productId)}>×</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <button className="reserve-btn" onClick={handleReserveClick} disabled={items.length === 0}>
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail