"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { AnimationMixer, PerspectiveCamera } from "three";

const MODEL_PATH = "/models/desktop.glb";

useGLTF.preload(MODEL_PATH);

export default function DesktopScene() {
  const { scene, animations, cameras } = useGLTF(MODEL_PATH);
  const { camera: canvasCamera, size } = useThree();
  const mixerRef = useRef<AnimationMixer | null>(null);

  useEffect(() => {
    if (!cameras || cameras.length === 0) return;

    const sourceCamera = cameras[0] as PerspectiveCamera;
    if (
      sourceCamera.isPerspectiveCamera &&
      canvasCamera instanceof PerspectiveCamera
    ) {
      canvasCamera.fov = sourceCamera.fov;
      canvasCamera.near = sourceCamera.near;
      canvasCamera.far = sourceCamera.far;
    }

    canvasCamera.position.copy(sourceCamera.position);
    canvasCamera.quaternion.copy(sourceCamera.quaternion);
    canvasCamera.updateProjectionMatrix();
  }, [cameras, canvasCamera]);

  useEffect(() => {
    if (canvasCamera instanceof PerspectiveCamera) {
      canvasCamera.aspect = size.width / size.height;
      canvasCamera.updateProjectionMatrix();
    }
  }, [canvasCamera, size.width, size.height]);

  useEffect(() => {
    if (!animations.length) return;

    const mixer = new AnimationMixer(scene);
    animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });
    mixerRef.current = mixer;

    return () => {
      mixer.stopAllAction();
      mixerRef.current = null;
    };
  }, [animations, scene]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return <primitive object={scene} dispose={null} />;
}
