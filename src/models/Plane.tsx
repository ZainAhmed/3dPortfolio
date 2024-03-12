import { useGLTF } from "@react-three/drei";
import planeScene from "../assets/3d/plane.glb";
function Plane() {
  const { scene, animations } = useGLTF(planeScene);
  return (
    <mesh>
      // use the primitive element when you want to directly embed a complex 3D
      model or scene
      <primitive object={scene} />
    </mesh>
  );
}

export default Plane;
