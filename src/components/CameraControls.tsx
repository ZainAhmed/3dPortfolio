/* eslint-disable react-hooks/exhaustive-deps */
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

function CameraControls() {
  const { camera } = useThree();
  const previousY = useRef(null);
  const [clicked, setClicked] = useState(false);
  // Function to handle scroll events
  const handleScroll = (event) => {
    // Adjust camera position based on scroll direction
    camera.position.z += event.deltaY * 0.1; // You can adjust the speed of zooming by changing the multiplier
    // Limit how close or far the camera can zoom
    const minZoom = 10;
    const maxZoom = 30;
    camera.position.z = Math.min(Math.max(camera.position.z, minZoom), maxZoom);
  };

  const handleMouseMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (clicked) {
      if (previousY.current !== null) {
        const deltaY = event.clientY - previousY.current;
        camera.position.y += deltaY * 0.01; // Adjust the speed of movement
      }
      previousY.current = event.clientY;
    }
  };

  const handleMouseUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setClicked(false);
    previousY.current = null;
  };

  const handleMouseDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setClicked(true);
    previousY.current = event.clientY;
  };

  // Add event listener for scroll events when component mounts
  useEffect(() => {
    camera.position.set(0, 0, 10); // Set x, y, z coordinates of the camera
    window.addEventListener("wheel", handleScroll);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    window.addEventListener("pointerup", handleMouseUp);
    window.addEventListener("pointerdown", handleMouseDown);
    window.addEventListener("pointermove", handleMouseMove);
    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("pointerup", handleMouseUp);
      window.removeEventListener("pointerdown", handleMouseDown);
      window.removeEventListener("pointermove", handleMouseMove);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]); // Empty dependency array ensures the effect runs only once

  useFrame(() => {
    if (previousY.current !== null) {
      // Limit how high or low the camera can move
      const maxY = 5;
      const minY = 0;
      camera.position.y = Math.min(Math.max(camera.position.y, minY), maxY);
    }
  });

  return null; // This component doesn't render anything, it just handles scroll events
}

export default CameraControls;
