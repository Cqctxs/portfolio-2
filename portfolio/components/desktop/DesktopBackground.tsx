"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Model, CameraAnimation } from "./DesktopScene";

export default function DesktopBackground() {
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
          position: [0, 2, -8],
          fov: 75,
          near: 0.1,
          far: 1000, // Increase far clipping plane to see distant objects
        }}
      >
        <color attach="background" args={["#0d021d"]} />
        <CameraAnimation />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}
