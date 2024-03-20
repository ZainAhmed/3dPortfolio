import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import birdScene from "../assets/3d/bird.glb";
import { adjustIslandForScreenSize } from "../utils/utils";

function Bird() {
  const { scene, animations } = useGLTF(birdScene);
  const birdRef = useRef();
  const { actions } = useAnimations(animations, birdRef);
  const [, islandPosition] = adjustIslandForScreenSize();

  useEffect(() => {
    actions["Take 001"].play();
  }, []);

  useFrame((state) => {
    const radius = 30;
    const speed = 2;
    const arcLength = state.clock.getElapsedTime() * speed;
    const theta = arcLength / radius;

    // Calculate the position of the bird along the circular path
    const x = islandPosition[0] + Math.cos(theta) * radius;
    const z = islandPosition[2] + Math.sin(theta) * radius;

    // Update the position of the bird's mesh
    if (birdRef.current) {
      birdRef.current.position.x = x;
      birdRef.current.position.z = z;

      // Set rotation directly based on the angle of rotation
      birdRef.current.rotation.y = -theta - Math.PI / 2; // Use theta as the angle of rotation
    }
  });

  return (
    <mesh scale={[0.003, 0.003, 0.003]} ref={birdRef}>
      <primitive object={scene} />
    </mesh>
  );
}

export default Bird;
