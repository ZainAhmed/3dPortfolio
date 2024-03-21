/* eslint-disable react-hooks/exhaustive-deps */
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Dispatch, MutableRefObject, useEffect, useRef, useState } from "react";
import { BufferGeometry, Group, Material, Mesh, Object3DEventMap } from "three";
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
  const [rotationSpeed, setRotationSpeed] = useState<number>(0); // Specify type for rotationSpeed
  const [, setCurrentStage] = useState<number>(0); // Specify type for currentStage
  const { viewport } = useThree();
  const lastX = useRef<number>(0); // Specify type for useRef
  const dampingFactor: number = 0.87; // Specify type for dampingFactor
  const islandRef: MutableRefObject<Group<Object3DEventMap> | null> =
    useRef<Group<Object3DEventMap> | null>(null); // Specify type for islandRef
  const planeRef: MutableRefObject<Mesh<
    BufferGeometry,
    Material | Material[],
    Object3DEventMap
  > | null> = useRef<Mesh<
    BufferGeometry,
    Material | Material[],
    Object3DEventMap
  > | null>(null); // Specify type for planeRef
  const skyRef: MutableRefObject<Mesh<
    BufferGeometry,
    Material | Material[],
    Object3DEventMap
  > | null> = useRef<Mesh<
    BufferGeometry,
    Material | Material[],
    Object3DEventMap
  > | null>(null); // Specify type for skyRef
  const { animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, planeRef);
  const swipeOffset = useRef<number>(0); // Specify type for swipeOffset

  const updateSwipteOffset = (input: number): void => {
    // Specify type for updateSwipteOffset
    swipeOffset.current = swipeOffset.current + input;
    if (Math.abs(swipeOffset.current) > 1) {
      swipeOffset.current = swipeOffset.current % 1;
    }
    if (swipeOffset.current < 0) {
      swipeOffset.current = 1 + swipeOffset.current;
    }
  };

  useEffect(() => {
    if (actions["Take 001"]) actions["Take 001"].reset().play().paused = true;
  }, [actions]); // Add missing dependency

  const handlePointerDown = (event: MouseEvent): void => {
    // Specify type for handlePointerDown
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);
    const clientX: number = event.clientX; // Specify type for clientX
    lastX.current = clientX;
  };

  const handlePointerUp = (event: Event): void => {
    // Specify type for handlePointerUp
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event: MouseEvent): void => {
    // Specify type for handlePointerMove
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      const clientX: number = event.clientX; // Specify type for clientX
      const delta: number = (clientX - lastX.current) / viewport.width; // Specify type for delta
      if (islandRef.current) {
        islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      }
      if (skyRef.current) {
        skyRef.current.rotation.y += delta * 0.01 * Math.PI * 0.5;
      }
      if (planeRef.current) {
        updateSwipteOffset(delta * 0.01 * Math.PI);
        if (actions["Take 001"])
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

  useFrame(() => {
    if (!isRotating) {
      setRotationSpeed((prev) => prev * dampingFactor);
      if (Math.abs(rotationSpeed) < 0.01) {
        setRotationSpeed(0);
      }
      if (islandRef.current) islandRef.current.rotation.y += rotationSpeed;
      if (skyRef.current) skyRef.current.rotation.y += rotationSpeed * 0.5;
      if (planeRef.current) {
        updateSwipteOffset(rotationSpeed);
        if (actions["Take 001"])
          actions["Take 001"].time =
            actions["Take 001"].getClip().duration * swipeOffset.current;
      }
    } else {
      const rotation: number | undefined = islandRef.current?.rotation.y;
      if (rotation !== undefined) {
        const normalizedRotation: number =
          ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
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
