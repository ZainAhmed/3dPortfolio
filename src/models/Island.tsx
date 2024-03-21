import { a } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { MutableRefObject } from "react";
import { Group, Mesh } from "three";
import islandScene from "../assets/3d/island.glb";
import { adjustIslandForScreenSize } from "../utils/utils";

interface NodesType {
  [key: string]: Mesh;
}

type PropsType = {
  islandRef: MutableRefObject<Group | null>;
};

function Island({ islandRef }: PropsType) {
  const [scale, position, rotation] = adjustIslandForScreenSize();
  const { nodes, materials } = useGLTF(islandScene) as unknown as {
    nodes: NodesType;
    materials: any; // Adjust this type if you have a specific type for materials
  };

  return (
    <a.group
      ref={islandRef}
      scale={scale}
      position={position}
      rotation={rotation}
    >
      {Object.values(nodes).map((mesh) => (
        <mesh
          key={mesh.uuid}
          geometry={mesh.geometry}
          material={materials.PaletteMaterial001}
        />
      ))}
    </a.group>
  );
}

export default Island;
