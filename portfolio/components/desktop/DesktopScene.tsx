"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import {
  AnimationMixer,
  PerspectiveCamera,
  type Group,
  type Mesh,
  type MeshStandardMaterial,
} from "three";
import type { GLTF } from "three-stdlib";

const MODEL_PATH = "/models/Background.glb";

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
