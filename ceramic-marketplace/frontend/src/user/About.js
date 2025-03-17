import React from 'react';
import { ChevronRight, Award, Users, Heart, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/About.css';

const About = () => {
  return (
    <div className="pottery-shop">
      <Navbar />
      
      <main className="pottery-main about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-image-container">
            <img 
              src="/placeholder.svg?height=600&width=1600&text=Our+Workshop" 
              alt="Artisan Pottery Workshop" 
              className="hero-image"
            />
            <div className="hero-overlay"></div>
          </div>
          
          <div className="pottery-container">
            <div className="hero-content">
              <h1 className="hero-title">Our Story</h1>
              <p className="hero-subtitle">Crafting beauty with passion since 1985</p>
              <div className="breadcrumb">
                <a href="/" className="breadcrumb-link">Home</a>
                <ChevronRight className="breadcrumb-separator" size={14} />
                <span className="breadcrumb-current">About Us</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="our-story-section">
          <div className="pottery-container">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-decoration"></span>
                Our Journey
                <span className="title-decoration"></span>
              </h2>
              <p className="section-subtitle">From humble beginnings to artisanal excellence</p>
            </div>
            
            <div className="story-content">
              <div className="story-image">
                <img 
                  src="/placeholder.svg?height=500&width=600&text=Founder" 
                  alt="Founder working on pottery" 
                  className="founder-image"
                />
              </div>
              
              <div className="story-text">
                <h3 className="story-heading">A Passion for Craftsmanship</h3>
                <p>
                  Artisan Pottery began in 1985 when Maria Chen, a skilled ceramicist with a vision, 
                  opened a small studio in the heart of Coral Gables. What started as a personal 
                  passion quickly blossomed into a beloved local establishment known for its 
                  exceptional craftsmanship and unique designs.
                </p>
                <p>
                  Over the decades, we've grown from a one-woman operation to a collective of 
                  talented artisans, each bringing their unique perspective and skills to our 
                  creations. Despite our growth, we've remained true to our founding principles: 
                  quality materials, meticulous attention to detail, and respect for traditional 
                  techniques.
                </p>
                <p>
                  Today, Artisan Pottery stands as a testament to the enduring beauty of handcrafted 
                  ceramics in a world of mass production. Each piece that leaves our workshop carries 
                  with it a piece of our story and the distinctive touch of the artisan who created it.
                </p>
                
                <div className="founder-quote">
                  <blockquote>
                    "Clay has memory. It remembers every touch, every intention of the artist. 
                    That's why handcrafted pottery has soul—it carries the energy of its creator."
                  </blockquote>
                  <cite>— Maria Chen, Founder</cite>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="values-section">
          <div className="pottery-container">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-decoration"></span>
                Our Values
                <span className="title-decoration"></span>
              </h2>
              <p className="section-subtitle">The principles that guide our craft</p>
            </div>
            
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon">
                  <Award />
                </div>
                <h3 className="value-title">Quality</h3>
                <p className="value-description">
                  We use only the finest clays and glazes, ensuring each piece is not only beautiful 
                  but durable enough to become a family heirloom.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <Users />
                </div>
                <h3 className="value-title">Community</h3>
                <p className="value-description">
                  We believe in nurturing the next generation of ceramicists through apprenticeships, 
                  workshops, and community engagement.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <Heart />
                </div>
                <h3 className="value-title">Sustainability</h3>
                <p className="value-description">
                  Our commitment to eco-friendly practices includes locally-sourced materials, 
                  energy-efficient kilns, and recyclable packaging.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <Clock />
                </div>
                <h3 className="value-title">Tradition</h3>
                <p className="value-description">
                  While embracing innovation, we honor traditional techniques passed down through 
                  generations of master potters.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Artisans Section */}
        <section className="artisans-section">
          <div className="pottery-container">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-decoration"></span>
                Meet Our Artisans
                <span className="title-decoration"></span>
              </h2>
              <p className="section-subtitle">The talented hands behind our creations</p>
            </div>
            
            <div className="artisans-grid">
              <div className="artisan-card">
                <div className="artisan-image-container">
                  <img 
                    src="/placeholder.svg?height=400&width=400&text=Artisan+1" 
                    alt="Elena Rodriguez" 
                    className="artisan-image"
                  />
                </div>
                <div className="artisan-info">
                  <h3 className="artisan-name">Elena Rodriguez</h3>
                  <p className="artisan-title">Master Potter</p>
                  <p className="artisan-bio">
                    With over 20 years of experience, Elena specializes in large decorative vessels 
                    with intricate carved designs inspired by her Latin American heritage.
                  </p>
                </div>
              </div>
              
              <div className="artisan-card">
                <div className="artisan-image-container">
                  <img 
                    src="/placeholder.svg?height=400&width=400&text=Artisan+2" 
                    alt="James Kim" 
                    className="artisan-image"
                  />
                </div>
                <div className="artisan-info">
                  <h3 className="artisan-name">James Kim</h3>
                  <p className="artisan-title">Glaze Specialist</p>
                  <p className="artisan-bio">
                    James creates our signature glazes, combining traditional Korean techniques 
                    with contemporary color palettes for truly unique finishes.
                  </p>
                </div>
              </div>
              
              <div className="artisan-card">
                <div className="artisan-image-container">
                  <img 
                    src="/placeholder.svg?height=400&width=400&text=Artisan+3" 
                    alt="Amara Okafor" 
                    className="artisan-image"
                  />
                </div>
                <div className="artisan-info">
                  <h3 className="artisan-name">Amara Okafor</h3>
                  <p className="artisan-title">Tableware Designer</p>
                  <p className="artisan-bio">
                    Amara's functional pottery combines elegance with practicality, creating 
                    tableware that elevates everyday dining to an art form.
                  </p>
                </div>
              </div>
              
              <div className="artisan-card">
                <div className="artisan-image-container">
                  <img 
                    src="/placeholder.svg?height=400&width=400&text=Artisan+4" 
                    alt="Thomas Bergman" 
                    className="artisan-image"
                  />
                </div>
                <div className="artisan-info">
                  <h3 className="artisan-name">Thomas Bergman</h3>
                  <p className="artisan-title">Sculptural Artist</p>
                  <p className="artisan-bio">
                    Thomas pushes the boundaries of ceramic art with his abstract sculptural pieces 
                    that challenge traditional notions of form and function.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Workshop Section */}
        <section className="workshop-section">
          <div className="pottery-container">
            <div className="section-header">
              <h2 className="section-title">
                <span className="title-decoration"></span>
                Our Workshop
                <span className="title-decoration"></span>
              </h2>
              <p className="section-subtitle">Where creativity takes shape</p>
            </div>
            
            <div className="workshop-gallery">
              <div className="gallery-item large">
                <img 
                  src="/placeholder.svg?height=600&width=800&text=Workshop+Space" 
                  alt="Our pottery workshop space" 
                  className="gallery-image"
                />
              </div>
              
              <div className="gallery-item">
                <img 
                  src="/placeholder.svg?height=400&width=400&text=Clay+Preparation" 
                  alt="Clay preparation process" 
                  className="gallery-image"
                />
              </div>
              
              <div className="gallery-item">
                <img 
                  src="/placeholder.svg?height=400&width=400&text=Wheel+Throwing" 
                  alt="Wheel throwing technique" 
                  className="gallery-image"
                />
              </div>
              
              <div className="gallery-item">
                <img 
                  src="/placeholder.svg?height=400&width=400&text=Glazing" 
                  alt="Glazing process" 
                  className="gallery-image"
                />
              </div>
              
              <div className="gallery-item">
                <img 
                  src="/placeholder.svg?height=400&width=400&text=Kiln+Firing" 
                  alt="Kiln firing process" 
                  className="gallery-image"
                />
              </div>
            </div>
            
            <div className="workshop-description">
              <p>
                Our 3,000 square foot workshop in Coral Gables is where the magic happens. Equipped with 
                both traditional and modern tools, our space allows our artisans to honor time-tested 
                techniques while exploring new possibilities in ceramic art.
              </p>
              <p>
                The workshop includes twelve pottery wheels, three kilns (including our prized wood-fired 
                anagama kiln), dedicated glazing stations, and a materials lab where we develop and test 
                our custom clay bodies and glazes.
              </p>
              <p>
                We invite you to visit our workshop during our monthly open studio days, where you can 
                watch our artisans at work and even try your hand at the potter's wheel.
              </p>
            </div>
          </div>
        </section>
        
        {/* Visit Us Section */}
        <section className="visit-section">
          <div className="pottery-container">
            <div className="visit-content">
              <div className="visit-text">
                <h2>Visit Our Studio</h2>
                <p>
                  We welcome visitors to our workshop and showroom. Come experience the warmth and 
                  creativity of our space, meet our artisans, and find the perfect handcrafted piece 
                  for your home.
                </p>
                
                <div className="visit-details">
                  <div className="detail-group">
                    <h3>Location</h3>
                    <address>
                      400 University Drive Suite 200<br />
                      Coral Gables, FL 33134 USA
                    </address>
                  </div>
                  
                  <div className="detail-group">
                    <h3>Hours</h3>
                    <p>Monday - Friday: 10am - 6pm<br />
                    Saturday: 10am - 4pm<br />
                    Sunday: Closed</p>
                  </div>
                  
                  <div className="detail-group">
                    <h3>Contact</h3>
                    <p>Phone: (305) 555-7890<br />
                    Email: info@artisanpottery.com</p>
                  </div>
                </div>
                
                <a href="/contact" className="visit-button">Contact Us</a>
              </div>
              
              <div className="visit-image">
                <img 
                  src="/placeholder.svg?height=500&width=600&text=Our+Showroom" 
                  alt="Our pottery showroom" 
                  className="showroom-image"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
