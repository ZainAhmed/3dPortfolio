/* eslint-disable react-hooks/exhaustive-deps */
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Dispatch, MutableRefObject, useEffect, useRef, useState } from "react";
import {
  BufferGeometry,
  Group,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";
import planeScene from "../assets/3d/plane.glb";
import Bird from "../models/Bird";
import Island from "../models/Island";
import Plane from "../models/Plane";
import Sky from "../models/Sky";
type PropsType = {
  isRotating: boolean;
  setIsRotating: Dispatch<React.SetStateAction<boolean>>;
};

function Models({ isRotating, setIsRotating }: PropsType) {
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const { viewport } = useThree();
  const lastX = useRef(0);
  const dampingFactor = 0.87;
  const islandRef: MutableRefObject<Group<Object3DEventMap> | null> =
    useRef<Group<Object3DEventMap>>(null);

  const planeRef: MutableRefObject<Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null> =
    useRef<
      Mesh<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >(null);

  const skyRef: MutableRefObject<Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null> =
    useRef<
      Mesh<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >(null);
  const { animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, planeRef);
  const swipeOffset = useRef(0);

  const updateSwipteOffset = (input: number) => {
    swipeOffset.current = swipeOffset.current + input;
    if (Math.abs(swipeOffset.current) > 1) {
      swipeOffset.current = swipeOffset.current % 1;
    }
    if (swipeOffset.current < 0) {
      swipeOffset.current = 1 + swipeOffset.current;
    }
  };

  useEffect(() => void (actions["Take 001"].reset().play().paused = true), []);
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
      if (islandRef.current) {
        islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      }
      if (skyRef.current) {
        skyRef.current.rotation.y += delta * 0.01 * Math.PI * 0.5;
      }
      // Update the reference for the last clientX position
      if (planeRef.current) {
        updateSwipteOffset(delta * 0.01 * Math.PI);
        actions["Take 001"].time =
          actions["Take 001"].getClip().duration * swipeOffset.current;
      }
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
      if (skyRef.current) skyRef.current.rotation.y += rotationSpeed * 0.5;

      if (planeRef.current) {
        updateSwipteOffset(rotationSpeed);
        actions["Take 001"].time =
          actions["Take 001"].getClip().duration * swipeOffset.current;
      }
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
    <>
      <Island islandRef={islandRef} />
      <Sky skyRef={skyRef} />
      <Bird />
      <Plane planeRef={planeRef} />
    </>
  );
}

export default Models;
