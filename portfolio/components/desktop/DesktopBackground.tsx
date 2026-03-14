"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Model, CameraAnimation } from "./DesktopScene";
import {
  EffectComposer,
  Bloom,
  GodRays,
  Scanline,
  Pixelation,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

export default function DesktopBackground() {
  const icosphereRef = useRef<THREE.Mesh>(null);
  const cactusRef = useRef<THREE.Group>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  {
    /* Track mouse position for interactive camera movement */
  }
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (event: MouseEvent) => {
      // Cancel the previous animation frame request
      cancelAnimationFrame(animationFrameId);

      // Schedule the update for the next animation frame
      animationFrameId = requestAnimationFrame(() => {
        mouseXRef.current = (event.clientX / window.innerWidth) * 2 - 1;
        mouseYRef.current = (event.clientY / window.innerHeight) * 2 - 1;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId); // Clean up on unmount
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #0f0724, #E94C89, #0d021d)",
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
        {/* <color attach="background" args={["#0d021d"]} /> */}
        <fog attach="fog" args={["#3d1a4d", 50, 400]} />
        <CameraAnimation
          icosphereRef={icosphereRef}
          mouseXRef={mouseXRef}
          mouseYRef={mouseYRef}
        />
        <Suspense fallback={null}>
          <Model
            icosphereRef={icosphereRef}
            cactusRef={cactusRef}
            onLoad={() => setModelLoaded(true)}
          />
        </Suspense>

        {/* Postprocessing Effects */}
        <EffectComposer>
          <Pixelation granularity={3} />
          {/* God Rays (Volumetric Light) from Icosphere */}
          {modelLoaded && icosphereRef.current ? (
            <GodRays
              key="godrays" // Force remount when model loads
              sun={icosphereRef.current}
              blendFunction={BlendFunction.SCREEN}
              samples={50} // Reduced for performance
              density={0.98}
              decay={0.96}
              weight={0.2}
              exposure={0.3}
              clampMax={1}
            />
          ) : (
            <></>
          )}
          {/* Bloom Effect */}
          <Bloom
            intensity={1.0} // Reduced intensity
            luminanceThreshold={0.85} // Increased threshold for performance
            luminanceSmoothing={0.9}
            mipmapBlur={true}
            radius={0.5} // Reduced radius
          />
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
