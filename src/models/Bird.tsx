import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferGeometry, Material, Mesh, Object3DEventMap } from "three";
import birdScene from "../assets/3d/bird.glb";
import { adjustIslandForScreenSize } from "../utils/utils";

function Bird() {
  const { scene, animations } = useGLTF(birdScene);

  // Adjust the useRef type to match the expected type
  const birdRef = useRef<Mesh<
    BufferGeometry,
    Material | Material[],
    Object3DEventMap
  > | null>(null);

  const { actions } = useAnimations(animations, birdRef);
  const [, islandPosition] = adjustIslandForScreenSize();

  useEffect(() => {
    if (actions["Take 001"]) {
      actions["Take 001"].play();
    }
  }, [actions]);

  useFrame((state) => {
    const radius = 30;
    const speed = 2;
    const arcLength = state.clock.getElapsedTime() * speed;
    const theta = arcLength / radius;

    const x = islandPosition[0] + Math.cos(theta) * radius;
    const z = islandPosition[2] + Math.sin(theta) * radius;

    if (birdRef.current) {
      birdRef.current.position.x = x;
      birdRef.current.position.z = z;
      birdRef.current.rotation.y = -theta - Math.PI / 2;
    }
  });

  return (
    <mesh scale={[0.003, 0.003, 0.003]} ref={birdRef}>
      <primitive object={scene} />
    </mesh>
  );
}

export default Bird;
