import { useEffect, useMemo, useRef } from 'react';
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import { Canvas, useGraph } from '@react-three/fiber';
import { createLazyFileRoute } from '@tanstack/react-router';
import * as THREE from 'three';
import { SkeletonUtils, type GLTF } from 'three-stdlib';

import { Button } from '@/components/ui/button';
import { useWomanAnimationsStore } from '@/store/woman-animations-store';

export const Route = createLazyFileRoute('/woman')({
  component: RouteComponent,
});

type ActionName =
  | 'GuitarPlaying'
  | 'Idle'
  | 'Running'
  | 'SalsaDancing'
  | 'TPose';

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Mesh019: THREE.SkinnedMesh;
    Mesh019_1: THREE.SkinnedMesh;
    Mesh019_2: THREE.SkinnedMesh;
    Mesh019_3: THREE.SkinnedMesh;
    Mesh019_4: THREE.SkinnedMesh;
    Mesh019_5: THREE.SkinnedMesh;
    Mesh019_6: THREE.SkinnedMesh;
    Mesh019_7: THREE.SkinnedMesh;
    Mesh019_8: THREE.SkinnedMesh;
    Mesh019_9: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    Glasses: THREE.MeshStandardMaterial;
    Eyes: THREE.MeshStandardMaterial;
    Hair: THREE.MeshStandardMaterial;
    Skin: THREE.MeshStandardMaterial;
    Mouth: THREE.MeshStandardMaterial;
    Shirt: THREE.MeshStandardMaterial;
    Pants: THREE.MeshStandardMaterial;
    Shoes: THREE.MeshStandardMaterial;
    Sole: THREE.MeshStandardMaterial;
    Laces: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

const MODEL_PATH = '/models/Woman.gltf';

function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions, names } = useAnimations(animations, group);
  const { setAnimations, animationIndex } = useWomanAnimationsStore();

  useEffect(() => {
    setAnimations(names);
  }, [setAnimations, names]);

  useEffect(() => {
    actions[names[animationIndex]]!.reset().fadeIn(0.5).play();
    return () => {
      actions[names[animationIndex]]!.fadeOut(0.5);
    };
  }, [actions, names, animationIndex]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <group name="SM_Chr_Developer_Female_02">
            <skinnedMesh
              castShadow
              name="Mesh019"
              geometry={nodes.Mesh019.geometry}
              material={materials.Glasses}
              skeleton={nodes.Mesh019.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Mesh019_1"
              geometry={nodes.Mesh019_1.geometry}
              material={materials.Eyes}
              skeleton={nodes.Mesh019_1.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Mesh019_2"
              geometry={nodes.Mesh019_2.geometry}
              material={materials.Hair}
              skeleton={nodes.Mesh019_2.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Mesh019_3"
              geometry={nodes.Mesh019_3.geometry}
              material={materials.Skin}
              skeleton={nodes.Mesh019_3.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Mesh019_4"
              geometry={nodes.Mesh019_4.geometry}
              material={materials.Mouth}
              skeleton={nodes.Mesh019_4.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Mesh019_5"
              geometry={nodes.Mesh019_5.geometry}
              material={materials.Shirt}
              skeleton={nodes.Mesh019_5.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Mesh019_6"
              geometry={nodes.Mesh019_6.geometry}
              material={materials.Pants}
              skeleton={nodes.Mesh019_6.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Mesh019_7"
              geometry={nodes.Mesh019_7.geometry}
              material={materials.Shoes}
              skeleton={nodes.Mesh019_7.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Mesh019_8"
              geometry={nodes.Mesh019_8.geometry}
              material={materials.Sole}
              skeleton={nodes.Mesh019_8.skeleton}
            />
            <skinnedMesh
              castShadow
              name="Mesh019_9"
              geometry={nodes.Mesh019_9.geometry}
              material={materials.Laces}
              skeleton={nodes.Mesh019_9.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

function Menu() {
  const { animations, animationIndex, setAnimationIndex } =
    useWomanAnimationsStore();

  return (
    <div className="fixed top-0 z-10">
      {animations.map((animation, index) => (
        <Button
          key={index}
          variant={index === animationIndex ? 'ghost' : 'outline'}
          onClick={() => setAnimationIndex(index)}
        >
          {animation}
        </Button>
      ))}
    </div>
  );
}

function RouteComponent() {
  return (
    <div className="w-[100vw] h-[100vh] bg-accent">
      <Canvas camera={{ fov: 50, position: [1, 1.5, 2.5] }} shadows="soft">
        <OrbitControls />
        <directionalLight
          position={[2, 3, -0.16]}
          intensity={5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <ambientLight intensity={2} />
        <group position={[0, -1, 0]}>
          <Model />
        </group>
        <mesh
          rotation={[-0.5 * Math.PI, 0, 0]}
          position={[0, -1, 0]}
          receiveShadow
        >
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial transparent color="lightblue" />
        </mesh>
      </Canvas>
      <Menu />
    </div>
  );
}
