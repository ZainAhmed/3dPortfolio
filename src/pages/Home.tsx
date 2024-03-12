import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "../components/Loader";
import Bird from "../models/Bird";
import Island from "../models/Island";
import Plane from "../models/Plane";
import Sky from "../models/Sky";
import { adjustIslandForScreenSize } from "../utils/utils";

function Home() {
  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();
  return (
    <section className="w-full h-screen relative">
      <Canvas
        className={`w-full h-screen bg-transparent`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={2} />
          <pointLight />
          <spotLight />
          <hemisphereLight />
          <Island
            scale={islandScale}
            position={islandPosition}
            rotation={islandRotation}
          />
          <Sky />
          <Bird />
          <Plane />
        </Suspense>
      </Canvas>
    </section>
  );
}

export default Home;
