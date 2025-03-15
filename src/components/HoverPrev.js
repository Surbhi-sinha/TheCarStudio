import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/HoverPrev.css";
import { getDescription as getImageDesc } from "./HoverPrev_children/Picture_and_text";
import { getDescription as getVideoDesc } from "./HoverPrev_children/Video_and_text";
import { getDescription as getGifDesc } from "./HoverPrev_children/Gif_and_text";
import { getDescription as getPdfDesc } from "./HoverPrev_children/Pdf_and_text";
import { div } from "three/tsl";

const MainPage = () => {
  const [hoveredContent, setHoveredContent] = useState(null);
  const [isHoveringPreview, setIsHoveringPreview] = useState(false);
  const [previewPosition, setPreviewPosition] = useState(null);

  // Function to get the description dynamically
  const getDescription = (page) => {
    switch (page) {
      case "image": return getImageDesc();
      case "video": return getVideoDesc();
      case "gif": return getGifDesc();
      case "pdf": return getPdfDesc();
      default: return null;
    }
  };

  // Function to show preview below the link
  const handleMouseEnter = (event, page) => {
    setHoveredContent(getDescription(page));

    // Get the position of the hovered link element
    const rect = event.target.getBoundingClientRect();
    setPreviewPosition({
      top: rect.bottom + window.scrollY + 5, // Slightly below the link
      left: rect.left + window.scrollX
    });
  };

  // Function to hide preview (only if not hovering preview box)
  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!isHoveringPreview) {
        setHoveredContent(null);
      }
    }, 200); // Small delay to allow moving to preview box
  };

  return (
    <div className="bg-darker-gray main-section">
    <div className="main-container lighter-gray-text p-3 ">
      <h1>Explore Our Multimedia Content</h1>
      <p className="intro-text">
        Welcome to our interactive content hub! Discover engaging multimedia experiences,
        including images, videos, GIFs, and PDFs. Hover over the links to preview content before exploring further.
      </p>

      <div className="content-section border rounded p-5">
        <p>
          📸 Check out an
          <span className="link-container">
            <Link to="/picture_text"
              onMouseEnter={(e) => handleMouseEnter(e, "image")}
              onMouseLeave={handleMouseLeave}>
              image
            </Link>
          </span>
          {"\t"} showcasing stunning visuals.
        </p>
        <p>
          🎥 Watch a
          <span className="link-container">
            <Link to="/video_text"
              onMouseEnter={(e) => handleMouseEnter(e, "video")}
              onMouseLeave={handleMouseLeave}>
              video
            </Link>
          </span>
          {"\t"}with informative content.
        </p>
        <p>
          🎞️ Enjoy a fun
          <span className="link-container">
            <Link to="/gif_text"
              onMouseEnter={(e) => handleMouseEnter(e, "gif")}
              onMouseLeave={handleMouseLeave}>
              GIF
            </Link>
          </span>
          {"\t"}animation.
        </p>
        <p>
          📄 Read an
          <span className="link-container">
            <Link to="/pdf_text"
              onMouseEnter={(e) => handleMouseEnter(e, "pdf")}
              onMouseLeave={handleMouseLeave}>
              interactive PDF
            </Link>
          </span>
          {"\t"}document.
        </p>
      </div>

      {/* Hover Preview with Image & Text */}
      {hoveredContent && previewPosition && (
        <div
          className="hover-preview"
          style={{ top: previewPosition.top, left: previewPosition.left }}
          onMouseEnter={() => setIsHoveringPreview(true)}
          onMouseLeave={() => {
            setIsHoveringPreview(false);
            setHoveredContent(null);
          }}
        >
          <div className="row text-start">
            <div className="col-md-4">
              <img src={hoveredContent.image} alt="Preview" className="preview-image" />
            </div>
            
            <div className="col-md-10">
              <p>{hoveredContent.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default MainPage;
