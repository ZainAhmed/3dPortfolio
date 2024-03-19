import { useGLTF } from "@react-three/drei";
import { MutableRefObject } from "react";

import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";
import skyScene from "../assets/3d/sky.glb";

type PropsType = {
  skyRef: MutableRefObject<Mesh<
    BufferGeometry<NormalBufferAttributes>,
    Material | Material[],
    Object3DEventMap
  > | null>;
};

function Sky({ skyRef }: PropsType) {
  const { scene } = useGLTF(skyScene);

  return (
    <mesh ref={skyRef}>
      {/* Use the primitive element when you want to directly embed a complex 3D model or scene */}
      <primitive object={scene} />
    </mesh>
  );
}

export default Sky;
