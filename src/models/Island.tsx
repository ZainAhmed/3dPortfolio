/* eslint-disable react-hooks/exhaustive-deps */
import { a } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { Group, Object3DEventMap } from "three";
import islandScene from "../assets/3d/island.glb";
import { adjustIslandForScreenSize } from "../utils/utils";
type PropsType = {
  isRotating: boolean;
  setIsRotating: Dispatch<SetStateAction<boolean>>;
  rotationSpeed: number;
  setRotationSpeed: Dispatch<React.SetStateAction<number>>;
};
function Island({
  isRotating,
  setIsRotating,
  rotationSpeed,
  setRotationSpeed,
}: PropsType) {
  const [scale, position, rotation] = adjustIslandForScreenSize();
  const { nodes, materials } = useGLTF(islandScene);
  const { viewport } = useThree();
  const lastX = useRef(0);
  const dampingFactor = 0.87;
  const islandRef: MutableRefObject<Group<Object3DEventMap> | null> =
    useRef<Group<Object3DEventMap>>(null);

  const handlePointerDown = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    const clientX = event.clientX;

    lastX.current = clientX;
  };

  const handlePointerUp = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;
      // Update the island's rotation based on the mouse/touch movement
      if (islandRef.current)
        islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      // Update the reference for the last clientX position
      lastX.current = clientX;
      setRotationSpeed(delta * 0.01 * Math.PI);
    }
  };

  useEffect(() => {
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handlePointerMove, handlePointerDown, handlePointerUp]);

  // This function is called on each frame update
  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      setRotationSpeed((prev) => prev * dampingFactor);

      if (Math.abs(rotationSpeed) < 0.01) {
        setRotationSpeed(0);
      }
      if (islandRef.current) islandRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <a.group
      ref={islandRef}
      scale={scale}
      position={position}
      rotation={rotation}
    >
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
}
export default Island;
