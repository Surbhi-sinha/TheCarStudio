import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

//Component imports
import NavigationBar from "./components/Navbar";
import UI_Dev from "./components/UI-Dev";
import HoverPrev from "./components/HoverPrev";
import ThreeD_Config from "./components/3D-Config";
import Video_Optimisation from "./components/Video-Opt";
import PictureGalary from "./components/PictureGalary";
import { Gif_and_text } from "./components/HoverPrev_children/Gif_and_text";
import { Pdf_and_text } from "./components/HoverPrev_children/Pdf_and_text";
import { Picture_and_text } from "./components/HoverPrev_children/Picture_and_text";
import { Video_and_text } from "./components/HoverPrev_children/Video_and_text";

import './App.css';

const App = () => {
  return (
    <Router>
      <NavigationBar/>
      <div className="min-h-screen bg-darker-gray h-100 p-8">
        <Routes>
          <Route path="/" element={<UI_Dev />} />
          <Route path="/preview" element={<HoverPrev />} />
          <Route path="/configurator" element={<ThreeD_Config />} />
          <Route path="/video" element={<Video_Optimisation />} />
          <Route path="/gallery" element={<PictureGalary />} />
          <Route path="/gif_text" element={<Gif_and_text />} />
          <Route path="/pdf_text" element={<Pdf_and_text />} />
          <Route path="/picture_text" element={<Picture_and_text />} />
          <Route path="/video_text" element={<Video_and_text />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
