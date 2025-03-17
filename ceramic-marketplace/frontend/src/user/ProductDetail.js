"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "../styles/product-detail.css"
import { Search, ShoppingCart, Heart, Share2, Minus, Plus, Star, ChevronRight, ChevronLeft, Truck, ShieldCheck, RefreshCw, Check, Tag } from 'lucide-react'
import { toast } from 'react-toastify'; // Import toast for notifications

const ProductDetail = () => {
  const params = useParams()
  const { id } = params
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [activeTab, setActiveTab] = useState("description")
  const [cartCount, setCartCount] = useState(0);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);


  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setProduct(data)
        
        // Fetch related products
        fetchRelatedProducts(data.categorie_id)
      } catch (error) {
        console.error("Error fetching product:", error)
        // Mock data for demo purposes
        const mockProduct = {
          _id: id,
          nom: "Handcrafted Ceramic Vase",
          description: "This beautiful handcrafted ceramic vase is made with premium clay and glazed to perfection. Each piece is unique with slight variations in color and texture, showcasing the artisan's skill and attention to detail. Perfect as a centerpiece or decorative accent in any room.",
          prix: 89.99,
          oldPrix: 119.99,
          quantite_stock: 15,
          categorie_id: "60b8d8f9e3c1f8c1d4e0e1a1",
          artisan_id: "art1",
          etat: "disponible",
          images: [
            "/placeholder.svg?height=600&width=600&text=Vase+Front",
            "/placeholder.svg?height=600&width=600&text=Vase+Side",
            "/placeholder.svg?height=600&width=600&text=Vase+Back",
            "/placeholder.svg?height=600&width=600&text=Vase+Detail"
          ],
          specifications: [
            { name: "Material", value: "Ceramic" },
            { name: "Dimensions", value: "10\" H x 6\" W" },
            { name: "Weight", value: "2.5 lbs" },
            { name: "Care", value: "Hand wash only" },
            { name: "Origin", value: "Handmade in USA" }
          ],
          artisan: {
            name: "Emma Johnson",
            bio: "Emma has been creating pottery for over 15 years, specializing in traditional techniques with modern designs."
          }
        }
        setProduct(mockProduct)
      } finally {
        setLoading(false)
      }
    }
    
    const fetchRelatedProducts = async (categoryId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/products?category=${categoryId}&limit=4`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        // Filter out the current product
        const filtered = data.filter(item => item._id !== id)
        setRelatedProducts(filtered.slice(0, 4))
      } catch (error) {
        console.error("Error fetching related products:", error)
        // Mock data for demo
        const mockRelated = Array.from({ length: 4 }, (_, i) => ({
          _id: `related-${i}`,
          nom: `Related Pottery Item ${i+1}`,
          prix: 45 + (i * 10),
          images: [`/placeholder.svg?height=300&width=300&text=Related+${i+1}`],
          categorie_id: "60b8d8f9e3c1f8c1d4e0e1a1"
        }))
        setRelatedProducts(mockRelated)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount
    if (newQuantity >= 1 && newQuantity <= (product?.quantite_stock || 10)) {
      setQuantity(newQuantity)
    }
  }



  const handleImageChange = (index) => {
    setActiveImage(index)
  }

  const handleNextImage = () => {
    if (product?.images?.length) {
      setActiveImage((prev) => (prev + 1) % product.images.length)
    }
  }

  const handlePrevImage = () => {
    if (product?.images?.length) {
      setActiveImage((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }


  const handleReserve = async () => {
    try {
        const response = await fetch('/api/reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: product._id,
                userId: 'USER_ID_HERE', // Replace with actual user ID from your auth context or state
                quantity,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to reserve product');
        }

        const data = await response.json();
        toast.success(data.message);
    } catch (error) {
        toast.error(error.message);
    }
    window.location.href = `/reserve?productId=${product._id}&quantity=${quantity}`;

};


  const handleAddToCart = () => {
    if (isProductInCart) {
        toast.info(`${product.nom} is already in the cart.`);
        return;
    }

    console.log(`Added to cart: ${product.nom}, Quantity: ${quantity}`);
    toast.success(`${product.nom} added to cart with quantity: ${quantity}`);

    // Update cart count
    setCartCount(prevCount => prevCount + quantity);
    setIsProductInCart(true); // Mark product as added
};
const handleCartClick = () => {
  if (isProductInCart) {
      setIsPopupVisible(true);
  } else {
      toast.info("Your cart is empty.");
  }
};
  const formatPrice = (price) => {
    if (price === undefined) return "N/A"
    return `$${Number(price).toFixed(2)}`
  }
  const Popup = ({ productName, quantity, price, onClose }) => {
    const totalPrice = (quantity * price).toFixed(2); // Calculate total price
    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                <p>Cart contains: {productName} (x{quantity})</p>
                <p>Total Price: ${totalPrice}</p>
            </div>
        </div>
    );
};

  const getCategoryName = (categoryId) => {
    const categories = {
      "60b8d8f9e3c1f8c1d4e0e1a1": "Vases",
      "60b8d8f9e3c1f8c1d4e0e1a2": "Tableware",
      "60b8d8f9e3c1f8c1d4e0e1a3": "Pots",
      "60b8d8f9e3c1f8c1d4e0e1a4": "Bowls",
      "60b8d8f9e3c1f8c1d4e0e1a5": "Decorative"
    }
    return categories[categoryId] || "Pottery"
  }

  const goBack = () => {
    window.history.back()
  }

  if (loading) {
    return (
      <div className="pottery-shop">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pottery-shop">
        <div className="error-container">
          <h2>Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <button className="back-button" onClick={goBack}>
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pottery-shop">
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
              <a href="/" className="nav-link">Home</a>
              <a href="/shop" className="nav-link active">Shop</a>
              <a href="/about" className="nav-link">About</a>
              <a href="/contact" className="nav-link">Contact</a>
            </div>

            <div className="pottery-nav-actions">
              <button aria-label="Search" className="action-button">
                <Search className="action-icon" />
              </button>
              <button aria-label="Favorites" className="action-button">
                <Heart className="action-icon" />
              </button>
<div className="pottery-nav-actions">
    <button aria-label="Cart" className="action-button" onClick={handleCartClick}>
        <ShoppingCart className="action-icon" />
        <span className="cart-count">{cartCount}</span>
    </button>
    {isPopupVisible && (
        <Popup 
            productName={product.nom} 
            quantity={quantity} 
            price={product.prix} 
            onClose={() => setIsPopupVisible(false)} 
        />
    )}

<button 
    className="reserve-button"
    onClick={handleReserve}
    disabled={product.quantite_stock <= 0}
>
    Reserve
</button>
</div>
            </div>
          </nav>
        </div>
      </header>

      <main className="pottery-main">
        <div className="pottery-container">
          <div className="breadcrumb-container">
            <div className="breadcrumb">
              <a href="/" className="breadcrumb-link">Home</a>
              <ChevronRight className="breadcrumb-separator" size={14} />
              <a href="/shop" className="breadcrumb-link">Shop</a>
              <ChevronRight className="breadcrumb-separator" size={14} />
              <a href={`/shop/category/${product.categorie_id}`} className="breadcrumb-link">
                {getCategoryName(product.categorie_id)}
              </a>
              <ChevronRight className="breadcrumb-separator" size={14} />
              <span className="breadcrumb-current">{product.nom}</span>
            </div>
          </div>
 
          <div className="product-detail-container">
            <div className="product-gallery">
              <div className="main-image-container">
                <button className="gallery-nav prev" onClick={handlePrevImage}>
                  <ChevronLeft size={24} />
                </button>
                <img 
                  src={product.images[activeImage] || "/placeholder.svg?height=600&width=600"} 
                  alt={product.nom} 
                  className="main-image" 
                />
                <button className="gallery-nav next" onClick={handleNextImage}>
                  <ChevronRight size={24} />
                </button>
              </div>
              
              <div className="thumbnail-container">
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`thumbnail ${activeImage === index ? 'active' : ''}`}
                    onClick={() => handleImageChange(index)}
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
              
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < 4 ? 'filled' : ''} />
                  ))}
                </div>
                <span className="rating-count">4.0 (24 reviews)</span>
              </div>
              
              <div className="product-price-container">
                <span className="product-price">{formatPrice(product.prix)}</span>
                {product.oldPrix && (
                  <span className="product-old-price">{formatPrice(product.oldPrix)}</span>
                )}
              </div>
              
              <div className="product-short-description">
                <p>{product.description.substring(0, 150)}...</p>
              </div>
              
              <div className="product-meta">
                <div className="meta-item">
                  <span className="meta-label">Availability:</span>
                  <span className={`meta-value ${product.quantite_stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {product.quantite_stock > 0 ? `In Stock (${product.quantite_stock} items)` : 'Out of Stock'}
                  </span>
                </div>
                
                <div className="meta-item">
                  <span className="meta-label">Artisan:</span>
                  <span className="meta-value">{product.artisan?.name || "Artisan Pottery"}</span>
                </div>
              </div>
              
              <div className="product-actions">
                <div className="quantity-selector">
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <input 
                    type="number" 
                    className="quantity-input" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.quantite_stock, parseInt(e.target.value) || 1)))}
                    min="1"
                    max={product.quantite_stock}
                  />
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.quantite_stock}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <button 
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                  disabled={product.quantite_stock <= 0}
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                
                <button className="wishlist-button">
                  <Heart size={18} />
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

    
              
              <div className="product-share">
                <span className="share-label">Share:</span>
                <div className="share-buttons">
                  <button className="share-button facebook">
                    <span className="social-icon facebook"></span>
                  </button>
                  <button className="share-button instagram">
                    <span className="social-icon instagram"></span>
                  </button>
                  <button className="share-button pinterest">
                    <span className="social-icon pinterest"></span>
                  </button>
                  <button className="share-button twitter">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="product-tabs">
            <div className="tabs-header">
              <button 
                className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={`tab-button ${activeTab === 'specifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button 
                className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews (24)
              </button>
            </div>
            
            <div className="tabs-content">
              {activeTab === 'description' && (
                <div className="tab-panel description">
                  <p>{product.description}</p>
                  
                  {product.artisan?.bio && (
                    <div className="artisan-info">
                      <h3>About the Artisan</h3>
                      <p>{product.artisan.bio}</p>
                    </div>
                  )}
                  
                  <div className="product-features">
                    <h3>Product Features</h3>
                    <ul className="features-list">
                      <li><Check size={16} className="check-icon" /> Handcrafted by skilled artisans</li>
                      <li><Check size={16} className="check-icon" /> Made with premium materials</li>
                      <li><Check size={16} className="check-icon" /> Unique design with attention to detail</li>
                      <li><Check size={16} className="check-icon" /> Durable and long-lasting</li>
                      <li><Check size={16} className="check-icon" /> Each piece is one-of-a-kind</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div className="tab-panel specifications">
                  <table className="specs-table">
                    <tbody>
                      {product.specifications?.map((spec, index) => (
                        <tr key={index}>
                          <th>{spec.name}</th>
                          <td>{spec.value}</td>
                        </tr>
                      )) || (
                        <>
                          <tr>
                            <th>Material</th>
                            <td>Ceramic</td>
                          </tr>
                          <tr>
                            <th>Dimensions</th>
                            <td>Varies by product</td>
                          </tr>
                          <tr>
                            <th>Weight</th>
                            <td>Varies by product</td>
                          </tr>
                          <tr>
                            <th>Care</th>
                            <td>Hand wash recommended</td>
                          </tr>
                          <tr>
                            <th>Origin</th>
                            <td>Handmade by artisans</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="tab-panel reviews">
                  <div className="reviews-summary">
                    <div className="average-rating">
                      <div className="rating-number">4.0</div>
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={i < 4 ? 'filled' : ''} />
                        ))}
                        <span className="total-reviews">Based on 24 reviews</span>
                      </div>
                    </div>
                    
                    <div className="rating-bars">
                      {[5, 4, 3, 2, 1].map(stars => (
                        <div key={stars} className="rating-bar-item">
                          <div className="stars-label">{stars} stars</div>
                          <div className="rating-bar">
                            <div 
                              className="rating-fill" 
                              style={{ 
                                width: `${stars === 4 ? '60%' : stars === 5 ? '20%' : stars === 3 ? '15%' : '5%'}` 
                              }}
                            ></div>
                          </div>
                          <div className="rating-percent">
                            {stars === 4 ? '60%' : stars === 5 ? '20%' : stars === 3 ? '15%' : '5%'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="reviews-list">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <div className="reviewer-avatar">
                              <img src={`/placeholder.svg?height=50&width=50&text=User`} alt="Reviewer" />
                            </div>
                            <div className="reviewer-meta">
                              <div className="reviewer-name">Customer {i + 1}</div>
                              <div className="review-date">
                                {new Date(Date.now() - (i * 7 * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="review-rating">
                            {[...Array(5)].map((_, star) => (
                              <Star key={star} size={14} className={star < (4 - i % 2) ? 'filled' : ''} />
                            ))}
                          </div>
                        </div>
                        <div className="review-content">
                          <h4 className="review-title">
                            {i === 0 ? "Beautiful craftsmanship" : i === 1 ? "Exactly as described" : "Great addition to my collection"}
                          </h4>
                          <p className="review-text">
                            {i === 0 
                              ? "This piece exceeded my expectations. The attention to detail is remarkable and it looks even better in person than in the photos."
                              : i === 1 
                                ? "The product arrived well-packaged and exactly as described. The colors are vibrant and the quality is excellent."
                                : "I've been collecting pottery for years and this piece stands out. The craftsmanship is superb and it's a beautiful addition to my home."
                            }
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="load-more-container">
                      <button className="load-more-button">Load More Reviews</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <section className="related-products">
            <h2 className="section-title">
              <span className="title-decoration"></span>
              Related Products
              <span className="title-decoration"></span>
            </h2>
            
            <div className="related-products-grid">
              {relatedProducts.map(product => (
                <article key={product._id} className="product-card" onClick={() => window.location.href = `/product/${product._id}`}>
                  <div className="product-image-wrapper">
                    <img
                      src={
                        Array.isArray(product.images) && product.images.length > 0
                          ? product.images[0]
                          : "/placeholder.svg?height=300&width=300"
                      }
                      alt={product.nom}
                      className="product-image"
                    />
                  </div>
                  
                  <div className="product-details">
                    <h3 className="product-name">{product.nom}</h3>
                    <div className="product-price">
                      <span className="current-price">{formatPrice(product.prix)}</span>
                    </div>
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
              <address className="footer-address">
                400 University Drive Suite 200
                <br />
                Coral Gables, FL 33134 USA
              </address>
            </div>

            <div className="footer-links-container">
              <div className="footer-links">
                <h3 className="footer-heading">Quick Links</h3>
                <ul className="footer-nav">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/shop">Shop</a>
                  </li>
                  <li>
                    <a href="/about">About Us</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </div>

              <div className="footer-links">
                <h3 className="footer-heading">Help</h3>
                <ul className="footer-nav">
                  <li>
                    <a href="/shipping">Shipping</a>
                  </li>
                  <li>
                    <a href="/returns">Returns & Exchanges</a>
                  </li>
                  <li>
                    <a href="/faq">FAQ</a>
                  </li>
                  <li>
                    <a href="/privacy">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-newsletter">
              <h3 className="footer-heading">Join Our Newsletter</h3>
              <p className="newsletter-text">Subscribe to receive updates, access to exclusive deals, and more.</p>

              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" className="newsletter-input" required />
                <button type="submit" className="newsletter-button">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">&copy; {new Date().getFullYear()} Artisan Pottery. All rights reserved.</div>

            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <span className="social-icon instagram"></span>
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <span className="social-icon facebook"></span>
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <span className="social-icon pinterest"></span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProductDetail;