import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { CarModel } from "./CarModel";
import "../Styles/CarCustomizer.css";

const colorOptions = [
  { name: "McLaren Orange", hex: "#FF8000" },
  { name: "Gloss Black", hex: "#1c1b13" },
  { name: "Pearl White", hex: "#F8F8FF" },
  { name: "Electric Blue", hex: "#0077FF" },
  { name: "Olive", hex: "#4d6228" },
  { name: "Red", hex: "red" },
  { name: "Pink", hex: "#caa69b" },
  { name: "Brown", hex: "#5d3411" },
];

const backgroundOptions = [
  { name: "Studio", image: "/backgrounds/studio.jpg" },
  { name: "No Background", image: null },
  { name: "City", image: "/backgrounds/city.jpg" },
];

const wheelOptions = [
  { name: "Sport", id: "sport" },
  { name: "Classic", id: "classic" },
  { name: "Off-road", id: "offroad" },
  { name: "Luxury", id: "luxury" },
];

const CarCustomizer = () => {
  const [selectedColor, setSelectedColor] = useState("#FF8000");
  const [selectedBackground, setSelectedBackground] = useState("/backgrounds/studio.jpg");
  const [selectedWheelStyle, setSelectedWheelStyle] = useState("sport");

  return (
    <div className="container-fluid car-customizer">
      <div className="row vh-100">
        {/* Left: 3D Model Viewer */}
        <div
          className="col-md-9 d-flex align-items-center justify-content-center p-0"
          style={{
            backgroundImage: selectedBackground ? `url(${selectedBackground})` : 'none',
            backgroundColor: selectedBackground ? 'transparent' : '#f0f0f0',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <Canvas className="canvas" style={{ height: "100%", width: "100%" }}>
            <OrbitControls enableZoom={true} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <CarModel color={selectedColor} wheelStyle={selectedWheelStyle} />
            {selectedBackground && <Environment preset="sunset" />}
          </Canvas>
        </div>

        {/* Right: Customization Panel */}
        <div className="col-md-3 d-flex flex-column bg-dark-gray lighter-gray-text p-4 shadow-lg">
          <h2 className="mb-4 text-center">Car Customizer</h2>
          <hr/>
          {/* Color Selection */}
          <div className="mb-4">
            <h4 className="mb-3">Body Color</h4>
            <div className="color-options d-flex flex-wrap justify-content-center">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
                  title={color.name}
                  className="color-button mx-2 my-1"
                  style={{
                    backgroundColor: color.hex,
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: selectedColor === color.hex ? "3px solid #000" : "1px solid #ccc"
                  }}
                  onClick={() => setSelectedColor(color.hex)}
                />
              ))}
            </div>
          </div>

          {/* Wheel Style Selection */}
          <div className="mb-4">
            <h4 className="mb-3">Wheel Style</h4>
            <div className="d-flex flex-wrap justify-content-center">
              {wheelOptions.map((wheel) => (
                <button
                  key={wheel.id}
                  className={`btn m-1 ${selectedWheelStyle === wheel.id ? 'btn-primary' : 'btn-outline-light'}`}
                  onClick={() => setSelectedWheelStyle(wheel.id)}
                >
                  {wheel.name}
                </button>
              ))}
            </div>
          </div>

          {/* Background Selection - Fixed alignment */}
          <div className="mb-4">
            <h4 className="mb-3">Background</h4>
            <div className="d-flex flex-wrap justify-content-center">
              {backgroundOptions.map((bg) => (
                <div
                  key={bg.name}
                  className="bg-option m-2"
                  style={{
                    width: "80px",
                    height: "60px",
                    cursor: "pointer",
                    border: selectedBackground === bg.image ? "3px solid #007bff" : "1px solid #ccc",
                    backgroundColor: bg.image ? 'transparent' : '#f0f0f0',
                    display: 'inline-block',
                    position: 'relative',
                    textAlign: 'center'
                  }}
                  onClick={() => setSelectedBackground(bg.image)}
                >
                  {bg.image ? (
                    <img
                      src={bg.image}
                      alt={bg.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%'
                      }}
                    >
                      No BG
                    </div>
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-20px',
                      left: '0',
                      right: '0',
                      fontSize: '12px'
                    }}
                  >
                    {bg.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p>
            <ul>
              <li>360° View</li>
              <li>Luxury Colors</li>
              <li>Custom Wheels</li>
              <li>Real-World Preview</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarCustomizer;