import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Loader from "../components/Loader";
import Bird from "../models/Bird";
import Island from "../models/Island";
import Plane from "../models/Plane";
import Sky from "../models/Sky";

function Home() {
  const [isRotating, setIsRotating] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0);
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
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            rotationSpeed={rotationSpeed}
            setRotationSpeed={setRotationSpeed}
          />
          <Sky />
          <Bird />
          <Plane rotationSpeed={rotationSpeed} isRotating={isRotating} />
        </Suspense>
      </Canvas>
    </section>
  );
}

export default Home;
