import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import planeScene from "../assets/3d/plane.glb";
import { adjustBiplaneForScreenSize } from "../utils/utils";
type PropsType = {
  isRotating: boolean;
};
function Plane({ isRotating }: PropsType) {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const [scale, position, rotation] = adjustBiplaneForScreenSize();
  const { actions } = useAnimations(animations, ref);
  useEffect(() => {
    // if (actions !== null) {
    if (isRotating) {
      actions["Take 001"].play();
    } else {
      actions["Take 001"].stop();
    }
    // }
  }, [actions, isRotating]);
  return (
    <mesh ref={ref}>
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
