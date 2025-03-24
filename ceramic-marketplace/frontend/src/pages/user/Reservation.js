// pages/Reservation.jsx
"use client"

import { useState, useEffect, useMemo } from "react"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { jwtDecode } from "jwt-decode"
import { ShoppingCart, ArrowLeft, Package } from "lucide-react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "../../styles/Reservation.css"

const Reservation = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || [])
  const [userId, setUserId] = useState(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUserId(decoded.id)
        setEmail(decoded.email || "")
      } catch (error) {
        console.error("Error decoding token:", error)
        toast.error("Authentication error. Please log in again.")
        navigate("/login")
      }
    } else {
      toast.error("Please log in to make a reservation")
      navigate("/login")
    }
  }, [navigate])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const productPromises = cart.map((item) =>
        fetch(`http://localhost:5000/api/products/${item.productId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch product ${item.productId}`)
          return res.json()
        })
      )
      const productData = await Promise.all(productPromises)
      setProducts(productData)
    } catch (error) {
      console.error("Error fetching product details:", error)
      setProducts([])
      toast.error("Failed to load product details")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (cart.length > 0) {
      fetchProducts()
    } else {
      setIsLoading(false)
    }
  }, [cart])

  const productMap = useMemo(() => {
    return products.reduce((map, product) => {
      map[product._id] = product
      return map
    }, {})
  }, [products])

  const validateCartStock = () => {
    const errors = []
    for (let item of cart) {
      const product = productMap[item.productId]
      if (!product) {
        errors.push(`Product ${item.name} not found`)
      } else if (item.quantity > product.quantite_stock) {
        errors.push(`Insufficient stock for ${product.nom}. Requested: ${item.quantity}, Available: ${product.quantite_stock}`)
      }
    }
    return errors.length > 0 ? errors.join("; ") : null
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleReservation = async (e) => {
    e.preventDefault()
    if (!userId) {
      toast.error("Please log in to reserve")
      navigate("/login")
      return
    }

    if (!name || !email || !address) {
      toast.error("Please fill in all required fields")
      return
    }

    await fetchProducts()
    const stockError = validateCartStock()
    if (stockError) {
      toast.error(stockError)
      return
    }

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    try {
      const reservationItems = cart.map((item) => ({
        productId: item.productId,
        userId: userId,
        vendorId: item.vendorId || "default_vendor_id",
        quantity: item.quantity,
        expiresAt: expiresAt.toISOString(),
        name,
        email,
        address
      }))

      const response = await fetch("http://localhost:5000/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ items: reservationItems }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to reserve products")
      }

      toast.success(data.message || "Reservation successful!")
      alert("Reservation successful!")
      setCart([])
      localStorage.removeItem("cart")
      navigate("/shop")
    } catch (error) {
      toast.error(error.message)
    }
  }

  const formatPrice = (price) => (price === undefined ? "N/A" : `$${Number(price).toFixed(2)}`)

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId))
    toast.info("Product removed from cart")
  }

  return (
    <div className="pottery-shop">
      <Header cart={cart} setCart={setCart} />

      <main className="pottery-main">
        <div className="reservation-page">
          <h1>Complete Your Reservation</h1>

          {isLoading ? (
            <div className="loading-spinner">Loading your cart...</div>
          ) : cart.length === 0 ? (
            <div className="empty-cart-message">
              <ShoppingCart size={64} />
              <p>Your cart is empty</p>
              <Link to="/shop" className="back-to-shop">
                <ArrowLeft size={18} />
                Back to Shop
              </Link>
            </div>
          ) : (
            <div className="reservation-container">
              <div className="reservation-summary">
                <h2>Your Cart Summary</h2>
                <ul className="cart-items">
                  {cart.map((item) => {
                    const product = productMap[item.productId]
                    const available = product ? product.quantite_stock : 'Unknown'
                    const imageUrl = product?.images?.[0] 
                      ? `http://localhost:5000${product.images[0]}` 
                      : "/placeholder.svg?height=50&width=50"
                    
                    return (
                      <li key={item.productId} className="cart-item">
                        <div className="cart-item-content">
                          <img 
                            src={imageUrl} 
                            alt={item.name} 
                            className="cart-item-image"
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=50&width=50"
                            }}
                          />
                          <div className="cart-item-details">
                            <span className="cart-item-name">{item.name}</span>
                            <span className="cart-item-quantity">Qty: {item.quantity}</span>
                            <span className="cart-item-stock">Available: {available}</span>
                            <span className="cart-item-price">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                        <button 
                          className="remove-btn" 
                          onClick={() => handleRemoveFromCart(item.productId)}
                        >
                          ×
                        </button>
                      </li>
                    )
                  })}
                </ul>
                <p className="total-price">Total: {formatPrice(totalPrice)}</p>
              </div>

              <div className="reservation-form">
                <h2>Your Information</h2>
                <form onSubmit={handleReservation}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Pickup Address:</label>
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter pickup address"
                      required
                    />
                  </div>

                  <button type="submit" className="confirm-btn">
                    <Package size={18} className="btn-icon" />
                    Confirm Reservation
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Reservation