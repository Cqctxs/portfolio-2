"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import DesktopScene from "./DesktopScene";

export default function DesktopBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #0f0724, #1a0f38, #0d021d)",
        }}
      />
      <Canvas gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["#0d021d"]} />
        <Suspense fallback={null}>
          <DesktopScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
