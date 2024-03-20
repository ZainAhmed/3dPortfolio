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

  useFrame((state, delta) => {
    const radius = 30; // Radius of the circular path
    const speed = 2; // Speed of the rotation
    const arcLength =
      (state.clock.getElapsedTime() * speed) % (Math.PI * 2 * radius); // Angle based on time
    const theta = arcLength / radius;

    // Calculate the position of the bird along the circular path
    const x = islandPosition[0] + Math.cos(theta) * radius;
    const z = islandPosition[2] + Math.sin(theta) * radius;

    // Update the position of the bird's mesh
    if (birdRef.current) {
      birdRef.current.position.x = x;
      birdRef.current.position.z = z;

      // Calculate the angle between the bird and the island's center
      const angleToIsland = Math.atan2(
        islandPosition[2] - z,
        islandPosition[0] - x
      );

      // Adjust the rotation to face the island's center
      birdRef.current.rotation.y = angleToIsland;
    }
  });

  return (
    <mesh
      position={[0, 3, -5]}
      scale={[0.003, 0.003, 0.003]}
      rotation={[0, 3.5, 0]}
      ref={birdRef}
    >
      <primitive object={scene} />
    </mesh>
  );
}

export default Bird;
