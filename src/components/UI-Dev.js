import React, { useState } from "react";
import { div } from "three/tsl";

const RadialMenu = () => {
  // State for vertical menu (original)
  const [expandedVertical, setExpandedVertical] = useState(false);
  const [hoveredVertical, setHoveredVertical] = useState(null);

  // State for horizontal menu (new)
  const [expandedHorizontal, setExpandedHorizontal] = useState(false);
  const [hoveredHorizontal, setHoveredHorizontal] = useState(null);

  // Function to generate SVG arc path for vertical menu (top half)
  const generateVerticalArcPath = (index, total, innerRadius, outerRadius) => {
    const startAngle = (index * Math.PI) / total - Math.PI / 2; // Positions arcs in 180°
    const endAngle = ((index + 1) * Math.PI) / total - Math.PI / 2;

    // Inner Arc Start and End Points
    const x1Inner = 200 + innerRadius * Math.cos(startAngle);
    const y1Inner = 200 + innerRadius * Math.sin(startAngle);
    const x2Inner = 200 + innerRadius * Math.cos(endAngle);
    const y2Inner = 200 + innerRadius * Math.sin(endAngle);

    // Outer Arc Start and End Points
    const x1Outer = 200 + outerRadius * Math.cos(startAngle);
    const y1Outer = 200 + outerRadius * Math.sin(startAngle);
    const x2Outer = 200 + outerRadius * Math.cos(endAngle);
    const y2Outer = 200 + outerRadius * Math.sin(endAngle);

    return `
      M ${x1Inner} ${y1Inner} 
      A ${innerRadius} ${innerRadius} 0 0 1 ${x2Inner} ${y2Inner} 
      L ${x2Outer} ${y2Outer} 
      A ${outerRadius} ${outerRadius} 0 0 0 ${x1Outer} ${y1Outer} 
      Z
    `;
  };

  // Function to generate SVG arc path for horizontal menu (left to right)
  const generateHorizontalArcPath = (index, total, innerRadius, outerRadius) => {
    // For horizontal menu, we rotate the entire coordinate system by 90 degrees
    const startAngle = (index * Math.PI) / total; // Start from right (0 degrees)
    const endAngle = ((index + 1) * Math.PI) / total;

    // Inner Arc Start and End Points
    const x1Inner = 200 + innerRadius * Math.cos(startAngle);
    const y1Inner = 200 + innerRadius * Math.sin(startAngle);
    const x2Inner = 200 + innerRadius * Math.cos(endAngle);
    const y2Inner = 200 + innerRadius * Math.sin(endAngle);

    // Outer Arc Start and End Points
    const x1Outer = 200 + outerRadius * Math.cos(startAngle);
    const y1Outer = 200 + outerRadius * Math.sin(startAngle);
    const x2Outer = 200 + outerRadius * Math.cos(endAngle);
    const y2Outer = 200 + outerRadius * Math.sin(endAngle);

    return `
      M ${x1Inner} ${y1Inner} 
      A ${innerRadius} ${innerRadius} 0 0 1 ${x2Inner} ${y2Inner} 
      L ${x2Outer} ${y2Outer} 
      A ${outerRadius} ${outerRadius} 0 0 0 ${x1Outer} ${y1Outer} 
      Z
    `;
  };

  // Calculate text path ID for horizontal menu
  const getTextPathId = (index) => `textPath${index}`;

  // Calculate arc path for text in horizontal menu
  const generateTextArcPath = (index, total, radius) => {
    const startAngle = (index * Math.PI) / total;
    const endAngle = ((index + 1) * Math.PI) / total;

    // Calculate start and end points
    const x1 = 200 + radius * Math.cos(startAngle);
    const y1 = 200 + radius * Math.sin(startAngle);
    const x2 = 200 + radius * Math.cos(endAngle);
    const y2 = 200 + radius * Math.sin(endAngle);

    // For text path, we need a simple arc
    return `
      M ${x1} ${y1}
      A ${radius} ${radius} 0 0 1 ${x2} ${y2}
    `;
  };

  return (
    <div className="bg-darker-gray lighter-gray-text">
      <div className="container bg-darker-gray p-3 radial-container">
        <div className="text-center m-5 instructions">
          Click on the <b>Start</b> buttons. <b>Hover</b> over the sections to see the effect.
        </div>

        <div className="row justify-content-center">
          <div className="col-md-5 me-2 text-start bg-dark-gray rounded p-3">

            {/* Original Vertical Radial Menu */}
            <h3 className="text-center mb-4">Vertical Radial View</h3>
            <svg width="400" height="400" viewBox="0 0 400 400">
              {/* Central Circle with Glow Effect */}
              <circle
                cx="200"
                cy="200"
                r="50"
                fill="url(#startGradient)"
                stroke="rgba(0, 48, 143, 0.8)"
                strokeWidth="5"
                className="start-button"
                onClick={() => setExpandedVertical(!expandedVertical)}
              />
              <text x="180" y="205" fontSize="16" fill="#fff" fontWeight="bold">Start</text>

              <defs>
                {/* Gradient for Start Button */}
                <radialGradient id="startGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#74b9ff" />
                  <stop offset="100%" stopColor="#00308F" />
                </radialGradient>

                {/* Gradient for Arcs */}
                <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="blue" />
                  <stop offset="100%" stopColor="#2980b9" />
                </linearGradient>
              </defs>

              {/* Main Segments (A, B, C) with Smooth Transitions */}
              {expandedVertical &&
                ["A", "B", "C"].map((label, i) => (
                  <g
                    key={label}
                    className="arc-group"
                    onMouseEnter={() => setHoveredVertical(label)}
                    onMouseLeave={() => setHoveredVertical(null)}
                  >
                    <path
                      d={generateVerticalArcPath(i, 3, 80, 140)}
                      fill={hoveredVertical === label ? "url(#arcGradient)" : "#3498db"}
                      stroke="#2c3e50"
                      strokeWidth="2"
                      className="arc"
                    />
                    <text
                      x={230 + 100 * Math.cos((i * Math.PI) / 2 - Math.PI / 2)}
                      y={200 + 100 * Math.sin((i * Math.PI) / 2 - Math.PI / 2)}
                      fontSize="14"
                      fill="#fff"
                      fontWeight="bold"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                    >
                      {label}
                    </text>
                  </g>
                ))}

              {/* Subset Expansion with Smooth Hover Effect */}
              {expandedVertical &&
                ["A", "B", "C"].map((subset, i) => (
                  <g key={subset} className="subset-group">
                    <path
                      d={generateVerticalArcPath(i, 3, 140, 200)}
                      fill={hoveredVertical === subset ? "#1e3799" : "#d3d3d3"}
                      stroke="#2c3e50"
                      strokeWidth="2"
                      className="subset"
                    />
                    <text
                      x={230 + 160 * Math.cos((i * Math.PI) / 2 - Math.PI / 2)}
                      y={200 + 160 * Math.sin((i * Math.PI) / 2 - Math.PI / 2)}
                      fontSize="12"
                      fill="#fff"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {subset}
                    </text>
                  </g>
                ))}
            </svg>

          </div>
          <div className="col-md-5 text-center  bg-dark-gray rounded">

            {/* New Horizontal Radial Menu */}
            <h3 className="text-center mb-4">Horizontal Radial View</h3>
            <svg width="400" height="400" viewBox="0 0 400 400">
              {/* Central Circle with Glow Effect */}
              <circle
                cx="200"
                cy="200"
                r="50"
                fill="url(#horizontalStartGradient)"
                stroke="rgba(143, 48, 0, 0.8)"
                strokeWidth="5"
                className="start-button"
                onClick={() => setExpandedHorizontal(!expandedHorizontal)}
              />
              <text x="180" y="205" fontSize="16" fill="#fff" fontWeight="bold">Start</text>

              <defs>
                {/* Gradient for Start Button */}
                <radialGradient id="horizontalStartGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff9f74" />
                  <stop offset="100%" stopColor="#8F3000" />
                </radialGradient>

                {/* Gradient for Arcs */}
                <linearGradient id="horizontalArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e67e22" />
                  <stop offset="100%" stopColor="#d35400" />
                </linearGradient>

                {/* Text paths for curved text */}
                {["X", "Y", "Z"].map((_, i) => (
                  <path
                    key={`textPath-${i}`}
                    id={getTextPathId(i)}
                    d={generateTextArcPath(i, 3, 110)} // Middle of the arc
                    fill="none"
                  />
                ))}
              </defs>

              {/* Main Segments (X, Y, Z) with Smooth Transitions */}
              {expandedHorizontal &&
                ["X", "Y", "Z"].map((label, i) => (
                  <g
                    key={label}
                    className="arc-group"
                    onMouseEnter={() => setHoveredHorizontal(label)}
                    onMouseLeave={() => setHoveredHorizontal(null)}
                  >
                    <path
                      d={generateHorizontalArcPath(i, 3, 80, 140)}
                      fill={hoveredHorizontal === label ? "url(#horizontalArcGradient)" : "#e67e22"}
                      stroke="#2c3e50"
                      strokeWidth="2"
                      className="arc"
                    />
                    {/* Curved text along the arc */}
                    <text
                      dy="-5" // Adjust vertical position
                      fontSize="14"
                      fill="#fff"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      <textPath
                        href={`#${getTextPathId(i)}`}
                        startOffset="50%"
                      >
                        {label}
                      </textPath>
                    </text>
                  </g>
                ))}

              {/* Subset Expansion with Smooth Hover Effect */}
              {expandedHorizontal &&
                ["X", "Y", "Z"].map((subset, i) => (
                  <g key={subset} className="subset-group">
                    <path
                      d={generateHorizontalArcPath(i, 3, 140, 200)}
                      fill={hoveredHorizontal === subset ? "#d35400" : "#d3d3d3"}
                      stroke="#2c3e50"
                      strokeWidth="2"
                      className="subset"
                    />
                  </g>
                ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RadialMenu;