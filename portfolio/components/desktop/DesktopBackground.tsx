"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Model, CameraAnimation } from "./DesktopScene";
import {
  EffectComposer,
  Bloom,
  GodRays,
  Scanline,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

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

        {/* Postprocessing Effects */}
        <EffectComposer>
          {/* Bloom Effect */}
          <Bloom
            intensity={3}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur={true}
            radius={0.85}
          />

          {/* God Rays (Volumetric Light) from Icosphere */}
          {icosphereRef.current && (
            <GodRays
              sun={icosphereRef.current}
              blendFunction={BlendFunction.SCREEN}
              samples={60} // Quality (30-100)
              density={0.96} // Ray density (0-1)
              decay={0.9} // Falloff (0-1)
              weight={0.6} // Intensity (0-1)
              exposure={0.6} // Brightness (0-1)
              clampMax={1} // Maximum brightness
            />
          )}

          {/* Scanlines */}
          <Scanline
            blendFunction={BlendFunction.OVERLAY}
            density={1.25} // Line density (higher = more lines)
            opacity={0.15} // Visibility (0-1)
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
