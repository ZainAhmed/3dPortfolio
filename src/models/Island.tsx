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
  setCurrentStage: Dispatch<React.SetStateAction<number>>;
};
function Island({
  isRotating,
  setIsRotating,
  rotationSpeed,
  setRotationSpeed,
  setCurrentStage,
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
    } else {
      const rotation = islandRef.current?.rotation.y;
      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      if (rotation) {
        const normalizedRotation =
          ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

        // Set the current stage based on the island's orientation
        switch (true) {
          case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
            setCurrentStage(4);
            break;
          case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
            setCurrentStage(3);
            break;
          case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
            setCurrentStage(2);
            break;
          case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
            setCurrentStage(1);
            break;
          default:
        }
      }
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
