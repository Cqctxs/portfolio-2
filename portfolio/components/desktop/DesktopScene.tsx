"use client";

import { useEffect, useRef, useState } from "react";
import { useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import {
  AnimationMixer,
  PerspectiveCamera,
  LoopRepeat,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
} from "three";
import type { GLTF } from "three-stdlib";

const MODEL_PATH = "/models/Background.glb";

// Camera animation settings - adjust these values
const CAMERA_ANIMATION = {
  duration: 5, // seconds for one complete cycle
  zOffset: -8, // how far to move on Z-axis (can be negative)
  startY: 5, // starting Y position
  easing: "linear", // "smooth" or "linear"
} as const;

useGLTF.preload(MODEL_PATH);

type SceneGLTFResult = GLTF & {
  nodes: {
    Cactus1: Mesh;
    Plane003: Mesh;
    Plane003_1: Mesh;
    Plane003_2: Mesh;
    Icosphere: Mesh;
  };
  materials: {
    Material: MeshStandardMaterial;
    "Material.001": MeshStandardMaterial;
    "Material.002": MeshStandardMaterial;
    "Material.003": MeshStandardMaterial;
  };
};

export function Model(props: ThreeElements["group"]) {
  const group = useRef<Group>(null);
  const { nodes, materials, animations } = useGLTF(
    MODEL_PATH
  ) as unknown as SceneGLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions ?? {}).forEach((action) => action?.play());
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Empty" position={[0, 0, -8]} />
        <mesh
          name="Cactus1"
          geometry={nodes.Cactus1.geometry}
          material={materials["Material.001"]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={0.085}
        />
        <group name="Plane001">
          <mesh
            name="Plane003"
            geometry={nodes.Plane003.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            name="Plane003_1"
            geometry={nodes.Plane003_1.geometry}
            material={materials.Material}
          />
          <mesh
            name="Plane003_2"
            geometry={nodes.Plane003_2.geometry}
            material={materials["Material.002"]}
          />
        </group>
        <mesh
          name="Icosphere"
          geometry={nodes.Icosphere.geometry}
          material={materials["Material.003"]}
          position={[0, 3.768, -200]}
          scale={44.62}
        />
      </group>
    </group>
  );
}

export default function DesktopScene() {
  const { scene, animations, cameras } = useGLTF(MODEL_PATH);
  const { camera: canvasCamera, size } = useThree();
  const sceneMixerRef = useRef<AnimationMixer | null>(null);
  const timeRef = useRef(0);
  const initialCameraZ = useRef<number | null>(null);

  // Set initial camera position
  useEffect(() => {
    if (canvasCamera instanceof PerspectiveCamera) {
      // Store initial Z position if not set
      if (initialCameraZ.current === null) {
        initialCameraZ.current = cameras?.[0]?.position.z ?? 0;
        canvasCamera.position.z = initialCameraZ.current;
      }

      // Set camera properties from GLTF camera if available
      if (cameras && cameras.length > 0) {
        const sourceCamera = cameras[0] as PerspectiveCamera;
        if (sourceCamera.isPerspectiveCamera) {
          canvasCamera.fov = sourceCamera.fov;
          canvasCamera.near = sourceCamera.near;
          canvasCamera.far = sourceCamera.far;
          canvasCamera.position.x = sourceCamera.position.x;
          canvasCamera.position.y = sourceCamera.position.y;
          canvasCamera.quaternion.copy(sourceCamera.quaternion);
        }
      }

      canvasCamera.updateProjectionMatrix();
    }
  }, [cameras, canvasCamera]);

  useEffect(() => {
    if (canvasCamera instanceof PerspectiveCamera) {
      canvasCamera.aspect = size.width / size.height;
      canvasCamera.updateProjectionMatrix();
    }
  }, [canvasCamera, size.width, size.height]);

  useEffect(() => {
    if (!animations.length) return;

    // Create mixer for scene animations (like Icosphere)
    const sceneMixer = new AnimationMixer(scene);

    animations.forEach((clip) => {
      const action = sceneMixer.clipAction(clip);
      action.setLoop(LoopRepeat, Infinity);
      action.play();
      console.log(`Playing scene animation: ${clip.name}`);
    });

    sceneMixerRef.current = sceneMixer;

    return () => {
      sceneMixer.stopAllAction();
      sceneMixerRef.current = null;
    };
  }, [animations, scene]);

  // Custom camera animation on each frame
  useFrame((_, delta) => {
    // Update scene animations
    sceneMixerRef.current?.update(delta);

    // Custom Z-axis camera animation
    timeRef.current += delta;
    const cycleDuration = CAMERA_ANIMATION.duration;
    const normalizedTime = (timeRef.current % cycleDuration) / cycleDuration; // 0 to 1

    // Calculate Z position with easing
    let progress = normalizedTime;

    // Apply Z animation
    const startZ = initialCameraZ.current ?? 0;
    const targetZ = startZ + CAMERA_ANIMATION.zOffset;
    canvasCamera.position.z = startZ + (targetZ - startZ) * progress;
  });

  return <primitive object={scene} dispose={null} />;
}
