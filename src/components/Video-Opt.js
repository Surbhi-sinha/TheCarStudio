import React from "react";
import "../Styles/VideoPage.css"; // Import CSS for styling
import fourKvideoSample from "../assets/car_vedio.mp4";

const VideoPage = () => {
  return (
    <div className="video-container">
      <div className="text-overlay">
        <h2>4K Video Streaming</h2>
        <p>The video starts playing automatically when you land on this page.</p>
      </div>
      <video autoPlay muted loop controls className="video-player">
        <source src={fourKvideoSample} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPage;