import { useGLTF } from "@react-three/drei";
import skyScene from "../assets/3d/sky.glb";

function Sky() {
  const { scene } = useGLTF(skyScene);
  return (
    <mesh>
      // use the primitive element when you want to directly embed a complex 3D
      model or scene
      <primitive object={scene} />
    </mesh>
  );
}

export default Sky;
