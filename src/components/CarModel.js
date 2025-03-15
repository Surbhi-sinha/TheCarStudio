import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

export const CarModel = ({ color, wheelStyle }) => {
  const { scene } = useGLTF("/models/car.glb");
  const modelRef = useRef();
  
  // Initial setup - position and rotate the car
  useEffect(() => {
    // Rotate the car to be horizontal
    scene.rotation.y = Math.PI / 2; // Rotate 90 degrees
    
    // Lower the car position
    scene.position.y = -1.5; // Adjust this value as needed
    
    // Debug: Log all mesh names to console
    console.log("All meshes in the model:");
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log(child.name);
      }
    });
  }, [scene]);
  
  // Apply color to car body - try multiple approaches
  useEffect(() => {
    console.log("Attempting to apply color:", color);
    
    // Approach 1: Try to find the main body mesh by name
    let bodyFound = false;
    
    scene.traverse((child) => {
      // Try different possible names for the car body
      if (child.isMesh && 
          (child.name === "main" || 
           child.name === "body" || 
           child.name === "car_body" || 
           child.name.includes("body"))) {
        console.log("Found body mesh:", child.name);
        child.material.color.set(color);
        bodyFound = true;
      }
    });
    
    // Approach 2: If no body found, try to identify by exclusion
    if (!bodyFound) {
      console.log("No body mesh found by name, trying by exclusion");
      scene.traverse((child) => {
        if (child.isMesh && 
            !child.name.includes("wheel_") && 
            child.name !== "steering_wheel") {
          console.log("Applying color to mesh by exclusion:", child.name);
          child.material.color.set(color);
        }
      });
    }
    
    // Approach 3: If all else fails, try to color the largest mesh
    if (!bodyFound) {
      console.log("Trying to find largest mesh");
      let largestMesh = null;
      let largestSize = 0;
      
      scene.traverse((child) => {
        if (child.isMesh && child.geometry) {
          const size = child.geometry.boundingSphere?.radius || 0;
          if (size > largestSize) {
            largestSize = size;
            largestMesh = child;
          }
        }
      });
      
      if (largestMesh) {
        console.log("Applying color to largest mesh:", largestMesh.name);
        largestMesh.material.color.set(color);
      }
    }
  }, [color, scene]);
  
  // Apply wheel styles
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.name.includes("wheel_")) {
        switch(wheelStyle) {
          case "sport":
            child.material.metalness = 0.9;
            child.material.roughness = 0.1;
            break;
          case "classic":
            child.material.metalness = 0.5;
            child.material.roughness = 0.5;
            break;
          case "offroad":
            child.material.metalness = 0.3;
            child.material.roughness = 0.8;
            // Make tires appear larger for off-road
            child.scale.set(1.05, 1.05, 1.05);
            break;
          case "luxury":
            child.material.metalness = 1.0;
            child.material.roughness = 0.05;
            break;
          default:
            break;
        }
        
        // Reset scale for non-offroad wheels
        if (wheelStyle !== "offroad") {
          child.scale.set(1, 1, 1);
        }
      }
    });
  }, [wheelStyle, scene]);

  return <primitive ref={modelRef} object={scene} scale={1.2} />;
};