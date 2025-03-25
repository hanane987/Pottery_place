// pages/About.jsx
"use client"

import { ChevronRight, Award, Users, Heart, Clock } from 'lucide-react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import '../../styles/About.css';
import React, { useState } from 'react';

const About = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

  return (
    <div className="pottery-shop">
      <Header cart={cart} setCart={setCart} />
      
      <main className="pottery-main about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hero-image-container">
            <img 
              src="/images/FIL6.jpg" 
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
                  src="/images/FIL9.jpg" 
                  alt="Founder working on pottery" 
                  className="founder-image"
                />
                <div className="image-frame"></div>
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
                  <Award size={28} />
                </div>
                <h3 className="value-title">Quality</h3>
                <p className="value-description">
                  We use only the finest clays and glazes, ensuring each piece is not only beautiful 
                  but durable enough to become a family heirloom.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <Users size={28} />
                </div>
                <h3 className="value-title">Community</h3>
                <p className="value-description">
                  We believe in nurturing the next generation of ceramicists through apprenticeships, 
                  workshops, and community engagement.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <Heart size={28} />
                </div>
                <h3 className="value-title">Sustainability</h3>
                <p className="value-description">
                  Our commitment to eco-friendly practices includes locally-sourced materials, 
                  energy-efficient kilns, and recyclable packaging.
                </p>
              </div>
              
              <div className="value-card">
                <div className="value-icon">
                  <Clock size={28} />
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
                    src="/images/FIL6.jpg" 
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
                    src="/images/female.jpg" 
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
                    src="/images/potry.jpg" 
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
                    src="/images/potteryman.jpg" 
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
                  src="/images/fil.jpeg" 
                  alt="Our pottery workshop space" 
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <span className="gallery-caption">Main Workshop</span>
                </div>
              </div>
              
              <div className="gallery-item">
                <img 
                  src="/images/fil1.jpeg" 
                  alt="Clay preparation process" 
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <span className="gallery-caption">Clay Preparation</span>
                </div>
              </div>
              
              <div className="gallery-item">
                <img 
                  src="/images/FIL2.jpg" 
                  alt="Wheel throwing technique" 
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <span className="gallery-caption">Wheel Throwing</span>
                </div>
              </div>
              
              <div className="gallery-item">
                <img 
                  src="/images/workshop.jpg" 
                  alt="Glazing process" 
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <span className="gallery-caption">Glazing</span>
                </div>
              </div>
              
              <div className="gallery-item">
                <img 
                  src="/images/work.jpg" 
                  alt="Kiln firing process" 
                  className="gallery-image"
                />
                <div className="gallery-overlay">
                  <span className="gallery-caption">Kiln Firing</span>
                </div>
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
      </main>
      
      <Footer />
    </div>
  );
};

export default About;