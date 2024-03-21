import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import CameraControls from "../components/CameraControls";
import Loader from "../components/Loader";
import Models from "../components/Models";

function Home() {
  const [isRotating, setIsRotating] = useState(false);

  return (
    <section
      className={`w-full h-screen relative ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <Canvas
        className={`w-full h-screen bg-transparent`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            // skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />
          <Models isRotating={isRotating} setIsRotating={setIsRotating} />
          <CameraControls />
        </Suspense>
      </Canvas>
    </section>
  );
}

export default Home;
