import { a } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { Dispatch, SetStateAction, useRef } from "react";
import islandScene from "../assets/3d/island.glb";
import { adjustIslandForScreenSize } from "../utils/utils";

type PropsType = {
  isRotating: boolean;
  setRotatin: Dispatch<SetStateAction<boolean>>;
};
function Island(props: PropsType) {
  const [scale, position, rotation] = adjustIslandForScreenSize();
  const { nodes, materials } = useGLTF(islandScene);
  const islandRef = useRef();
  return (
    <a.group
      // ref={islandRef}
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
