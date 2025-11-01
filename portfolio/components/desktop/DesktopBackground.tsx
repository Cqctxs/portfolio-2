"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Model, CameraAnimation } from "./DesktopScene";

export default function DesktopBackground() {
  const icosphereRef = useRef<any>(null);

  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #0f0724, #1a0f38, #0d021d)",
        }}
      />
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{
          position: [0, 0.74, 8],
          fov: 90,
          near: 0.1,
          far: 1000, // Increase far clipping plane to see distant objects
          rotation: [0, 0, 0],
        }}
      >
        <color attach="background" args={["#0d021d"]} />
        <CameraAnimation icosphereRef={icosphereRef} />
        <Suspense fallback={null}>
          <Model icosphereRef={icosphereRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
