// pages/Home.jsx
"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {
  ArrowRight,
  Star,
  Award,
  CheckCircle,
  Package,
  Headphones,
  Mail,
} from "lucide-react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "../../styles/Home.css"

const Home = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || [])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:5000/api/products/all")
      if (!response.ok) throw new Error("Failed to fetch products")
      const data = await response.json()
      const featured = data.slice(0, 4)
      setFeaturedProducts(featured)
    } catch (error) {
      console.error("Error fetching featured products:", error)
      setFeaturedProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.productId === product._id)

    if (existingItem) {
      setCart(cart.map((item) => 
        item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ))
      toast.success(`${product.nom} quantity updated in cart`)
    } else {
      setCart([
        ...cart,
        {
          productId: product._id,
          name: product.nom,
          price: product.prix,
          quantity: 1,
          vendorId: product.artisan_id || "default_vendor_id",
        },
      ])
      toast.success(`${product.nom} added to cart`)
    }
  }

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error("Please enter your email")
      return
    }

    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error("Failed to subscribe")

      toast.success("Thank you for subscribing!")
      setEmail("")
    } catch (error) {
      toast.error(error.message || "Failed to subscribe. Please try again.")
    }
  }

  const formatPrice = (price) => (price === undefined ? "N/A" : `$${Number(price).toFixed(2)}`)

  return (
    <div className="pottery-shop">
      <Header cart={cart} setCart={setCart} />

      <main className="pottery-main home-page">
        {/* Hero Section */}
        <section className="home-hero">
          <div className="hero-image-container">
            <img src="/images/FIL6.jpg" alt="Handcrafted Pottery" className="hero-image" />
            <div className="hero-overlay"></div>
          </div>

          <div className="pottery-container">
            <div className="hero-content">
              <h1 className="hero-title">
                Handcrafted Pottery
                <br />
                For Your Home
              </h1>
              <p className="hero-subtitle">Unique ceramic pieces made with passion and tradition</p>
              <div className="hero-buttons">
                <a href="/shop" className="primary-button">
                  Shop Collection
                  <ArrowRight size={18} />
                </a>
                <a href="/about" className="secondary-button">
                  Our Story
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="featured-products-section">
          <div className="pottery-container">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-decoration"></span>
                Featured Collection
                <span className="title-decoration"></span>
              </h2>
              <p className="section-subtitle">Discover our most popular handcrafted pieces</p>
            </div>

            <div className="featured-products-grid">
              {isLoading ? (
                <div className="loading-spinner">Loading...</div>
              ) : featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <article key={product._id} className="product-card">
                    <div className="product-image-wrapper" onClick={() => navigate(`/product/${product._id}`)}>
                      <img
                        src={
                          product.images?.[0]
                            ? `http://localhost:5000${product.images[0]}`
                            : "/placeholder.svg?height=300&width=300"
                        }
                        alt={product.nom}
                        className="product-image"
                      />
                      {product.quantite_stock <= 0 && <div className="sold-out-badge">Sold Out</div>}
                      <div className="product-actions-overlay">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (product.quantite_stock > 0) {
                              handleAddToCart(product)
                            }
                          }}
                          className="add-to-cart-btn"
                          disabled={product.quantite_stock <= 0}
                        >
                          {product.quantite_stock > 0 ? "Add to Cart" : "Sold Out"}
                        </button>
                      </div>
                    </div>
                    <div className="product-details">
                      <div className="product-rating">
                        <Star size={14} className="star-icon filled" />
                        <Star size={14} className="star-icon filled" />
                        <Star size={14} className="star-icon filled" />
                        <Star size={14} className="star-icon filled" />
                        <Star size={14} className="star-icon" />
                        <span className="rating-count">(4.0)</span>
                      </div>
                      <h3 className="product-name" onClick={() => navigate(`/product/${product._id}`)}>
                        {product.nom}
                      </h3>
                      <div className="product-footer">
                        <div className="product-price">{formatPrice(product.prix)}</div>
                        <button
                          className="quick-cart-btn"
                          onClick={() => {
                            if (product.quantite_stock > 0) {
                              handleAddToCart(product)
                            }
                          }}
                          disabled={product.quantite_stock <= 0}
                        >
                          {/* <ShoppingCart size={16} /> */}
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="no-products-message">
                  <p>No featured products available at the moment.</p>
                </div>
              )}
            </div>

            <div className="view-all-container">
              <a href="/shop" className="view-all-button">
                View All Products
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="pottery-container">
            <div className="story-content">
              <div className="story-image">
                <img src="/images/FIL9.jpg" alt="Our pottery workshop" className="workshop-image" />
                <div className="image-frame"></div>
              </div>

              <div className="story-text">
                <h2 className="story-heading">Our Passion for Pottery</h2>
                <p>
                  At Artisan Pottery, we believe in the beauty of handcrafted ceramics. Each piece tells a story of
                  tradition, craftsmanship, and artistic expression.
                </p>
                <p>
                  Since 1985, our skilled artisans have been creating unique pottery pieces using time-honored
                  techniques passed down through generations, combined with contemporary designs that bring fresh
                  perspectives to this ancient craft.
                </p>
                <p>
                  Every bowl, vase, and plate that leaves our workshop carries with it the distinctive touch of the
                  artisan who created it, making each piece truly one-of-a-kind.
                </p>

                <a href="/about" className="learn-more-button">
                  Learn More About Us
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="pottery-container">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-decoration"></span>
                What Our Customers Say
                <span className="title-decoration"></span>
              </h2>
              <p className="section-subtitle">Hear from people who have brought our pottery into their homes</p>
            </div>

            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="star-icon filled" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "The dinner set I purchased is absolutely stunning. The craftsmanship is exceptional, and the glazes
                  are even more beautiful in person. These pieces have transformed our dining experience."
                </p>
                <div className="testimonial-author">
                  <img src="/placeholder.svg?height=60&width=60&text=JD" alt="Jane Doe" className="author-image" />
                  <div className="author-info">
                    <h4 className="author-name">Jane Doe</h4>
                    <p className="author-location">Miami, FL</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="star-icon filled" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "I've been collecting Artisan Pottery pieces for years, and each one brings me joy. The quality is
                  consistent, and the designs are timeless. I always receive compliments when guests visit my home."
                </p>
                <div className="testimonial-author">
                  <img src="/placeholder.svg?height=60&width=60&text=MS" alt="Michael Smith" className="author-image" />
                  <div className="author-info">
                    <h4 className="author-name">Michael Smith</h4>
                    <p className="author-location">New York, NY</p>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={`star-icon ${i < 4 ? "filled" : ""}`} />
                  ))}
                </div>
                <p className="testimonial-text">
                  "The vase I ordered arrived perfectly packaged and exceeded my expectations. It's not just a container
                  for flowers; it's a work of art that stands beautifully on its own. Worth every penny."
                </p>
                <div className="testimonial-author">
                  <img src="/placeholder.svg?height=60&width=60&text=EJ" alt="Emily Johnson" className="author-image" />
                  <div className="author-info">
                    <h4 className="author-name">Emily Johnson</h4>
                    <p className="author-location">Chicago, IL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Features Section */}
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

export default Home