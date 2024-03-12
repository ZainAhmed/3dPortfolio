import { useGLTF } from "@react-three/drei";
import planeScene from "../assets/3d/plane.glb";
import { adjustBiplaneForScreenSize } from "../utils/utils";
function Plane() {
  const { scene, animations } = useGLTF(planeScene);
  const [scale, position, rotation] = adjustBiplaneForScreenSize();
  return (
    <mesh>
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
