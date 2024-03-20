import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function ZoomControls() {
  const { camera } = useThree();

  // Function to handle scroll events
  const handleScroll = (event) => {
    // Adjust camera position based on scroll direction
    camera.position.z += event.deltaY * 0.1; // You can adjust the speed of zooming by changing the multiplier
    // Limit how close or far the camera can zoom
    const minZoom = 0;
    const maxZoom = 50;
    camera.position.z = Math.min(Math.max(camera.position.z, minZoom), maxZoom);
  };

  // Add event listener for scroll events when component mounts
  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return null; // This component doesn't render anything, it just handles scroll events
}

export default ZoomControls;
