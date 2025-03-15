// import React, { useState, useEffect, useRef } from 'react';


import React, { useState, useEffect, useRef } from 'react';
import "../Styles/PictureGallery.css"; 

const ImageGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  
  // Image data with your links
  const images = [
    { id: 1, url: "/pictures/car1.jpg"},
    { id: 2, url: "/pictures/car2.jpg"},
    { id: 3, url: "/pictures/car3.jpg" },
    { id: 4, url: "/pictures/car4.jpg" },
    { id: 5, url: "/pictures/car5.jpg" },
    { id: 6, url: "/pictures/car6.jpg" },
    { id: 6, url: "/pictures/car7.jpg" },
    { id: 6, url: "/pictures/car8.jpg" },
    { id: 6, url: "/pictures/car9.jpg" },
    { id: 6, url: "/pictures/car10.jpg" },
    { id: 6, url: "/pictures/car11.jpg" },
  ];

  // Handle scroll event
  const handleScroll = (event) => {
    event.preventDefault();
    
    // Only process if not currently in a scrolling cooldown
    if (!isScrolling) {
      setIsScrolling(true);
      
      // Determine scroll direction
      if (event.deltaY > 0) {
        // Scrolling down - next image
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
      } else {
        // Scrolling up - previous image
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      }
      
      // Reset the scrolling state after a delay
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300); // Adjust this value to control sensitivity
    }
  };

  // Set up event listeners
  useEffect(() => {
    const wheelHandler = (e) => handleScroll(e);
    
    // Add event listener with passive: false to allow preventDefault()
    window.addEventListener('wheel', wheelHandler, { passive: false });
    
    // Clean up
    return () => {
      window.removeEventListener('wheel', wheelHandler);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []); // Empty dependency array to set up only once

  const calculatePosition = (index) => {
    const totalImages = images.length;
    // Calculate the relative index (distance from active index)
    let relativeIndex = index - activeIndex;
    
    // Handle wrapping for a circular effect
    if (relativeIndex > totalImages / 2) relativeIndex -= totalImages;
    if (relativeIndex < -totalImages / 2) relativeIndex += totalImages;
    
    // Distribute 5 images across the view
    const angleDeg = 40; // Smaller angle to fit more images
    const angleRad = relativeIndex * (angleDeg * Math.PI / 180);
    
    const radius = 350; // Radius for the circular arrangement
    const zDistance = 100; // Depth of the circle
    
    const x = radius * Math.sin(angleRad);
    const z = radius * Math.cos(angleRad) - zDistance;
    
    // Calculate opacity and scale based on position
    // Make the effect more subtle to show more images clearly
    const opacity = Math.abs(relativeIndex) > 2 ? 0.7 : 1;
    const scale = 1 - (Math.abs(relativeIndex) * 0.1); // Gradual scaling
    
    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
      opacity,
      zIndex: 1000 - Math.abs(relativeIndex) // Higher z-index for center images
    };
  };

  return (
    <div className="gallery-container mt-5" ref={galleryRef}>
      {/* Blurred background of current active image */}
      <div 
        className="background-image" 
        style={{
          backgroundImage: `url(${images[activeIndex].url})`,
        }}
      ></div>
      
      {/* Minimap at the top */}
      <div className="gallery-minimap">
        {images.map((image, index) => (
          <div 
            key={`minimap-${image.id}`}
            className={`minimap-item ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <img src={image.url} alt={`thumbnail-${index}`} />
          </div>
        ))}
      </div>
      
      <div className="main-content">
        <div className="gallery-wrapper">
          <div className="gallery">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`gallery-item ${index === activeIndex ? 'active' : ''}`}
                style={calculatePosition(index)}
                onClick={() => setActiveIndex(index)}
              >
                <img src={image.url} alt={`image-${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

