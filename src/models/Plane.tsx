import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MutableRefObject, useEffect, useRef } from "react";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";
import planeScene from "../assets/3d/plane.glb";
import { adjustBiplaneForScreenSize } from "../utils/utils";

type PropsType = { rotationSpeed: number; isRotating: boolean };
function Plane({ rotationSpeed, isRotating }: PropsType) {
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
  const { scene, animations } = useGLTF(planeScene);
  const [scale, position, rotation] = adjustBiplaneForScreenSize();
  const { actions } = useAnimations(animations, planeRef);
  const swipeOffset = useRef(0);

  const updateSwipteOffset = () => {
    swipeOffset.current = swipeOffset.current + rotationSpeed;
    if (Math.abs(swipeOffset.current) > 1) {
      swipeOffset.current = swipeOffset.current % 1;
    }
    if (swipeOffset.current < 0) {
      swipeOffset.current = 1 + swipeOffset.current;
    }
  };

  useEffect(() => void (actions["Take 001"].reset().play().paused = true), []);
  useFrame(() => {
    if (Math.abs(rotationSpeed) > 0.001) {
      updateSwipteOffset();
      actions["Take 001"].time =
        actions["Take 001"].getClip().duration * swipeOffset.current;
    }
  });

  return (
    <mesh ref={planeRef}>
      // use the primitive element when you want to directly embed a complex 3D
      model or scene
      <primitive
        object={scene}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    </mesh>
  );
}

export default Plane;
