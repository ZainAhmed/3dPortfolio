import { useGLTF } from "@react-three/drei";
import { MutableRefObject } from "react";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";
import planeScene from "../assets/3d/plane.glb";
import { adjustBiplaneForScreenSize } from "../utils/utils";

type PropsType = {
  planeRef: MutableRefObject<Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null>;
};
function Plane({ planeRef }: PropsType) {
  const { scene } = useGLTF(planeScene);
  const [scale, position, rotation] = adjustBiplaneForScreenSize();

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
