import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

function SceneMovement() {
  const { camera } = useThree();
  const previousY = useRef(null);

  const handleMouseMove = (event) => {
    if (previousY.current !== null) {
      const deltaY = event.clientY - previousY.current;
      camera.position.y += deltaY * 0.01; // Adjust the speed of movement
    }
    previousY.current = event.clientY;
  };

  const handleMouseUp = () => {
    previousY.current = null;
  };

  const handleMouseDown = (event) => {
    previousY.current = event.clientY;
  };

  useFrame(() => {
    if (previousY.current !== null) {
      // Limit how high or low the camera can move
      const maxY = 10;
      const minY = -10;
      camera.position.y = Math.min(Math.max(camera.position.y, minY), maxY);
    }
  });

  return (
    <div
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
    ></div>
  );
}

export default SceneMovement;
