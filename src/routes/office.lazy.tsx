import { useLayoutEffect, useRef } from 'react';
import {
  OrbitControls,
  ScrollControls,
  useGLTF,
  useScroll,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { createLazyFileRoute } from '@tanstack/react-router';
import gsap from 'gsap';
import * as THREE from 'three';
import { type GLTF } from 'three-stdlib';

export const Route = createLazyFileRoute('/office')({
  component: RouteComponent,
});

type GLTFResult = GLTF & {
  nodes: {
    ['01_office']: THREE.Mesh;
    ['02_library']: THREE.Mesh;
    ['03_attic']: THREE.Mesh;
  };
  materials: {
    ['01']: THREE.MeshStandardMaterial;
    ['02']: THREE.MeshStandardMaterial;
    ['03']: THREE.MeshStandardMaterial;
  };
  animations: [];
};

const MODEL_PATH = '/models/WawaOffice.glb';

const FLOOR_HEIGHT = 2.3;
const NB_FLOORS = 3;

function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(MODEL_PATH) as GLTFResult;
  const ref = useRef<THREE.Group<THREE.Object3DEventMap>>(null);
  const tl = useRef<gsap.core.Timeline>();

  const scroll = useScroll();

  useFrame(() => {
    tl.current!.seek(scroll.offset * tl.current!.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(
      ref.current!.position,
      {
        duration: 2,
        y: -FLOOR_HEIGHT * (NB_FLOORS - 1),
      },
      0,
    );
  }, []);

  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh geometry={nodes['01_office'].geometry} material={materials['01']} />
      <mesh
        geometry={nodes['02_library'].geometry}
        material={materials['02']}
        position={[0, 2.114, -2.23]}
      />
      <mesh
        geometry={nodes['03_attic'].geometry}
        material={materials['03']}
        position={[-1.97, 4.227, -2.199]}
      />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

function RouteComponent() {
  return (
    <div className="w-[100vw] h-[100vh] bg-accent">
      <Canvas
        camera={{
          fov: 64,
          position: [2.3, 1.5, 2.3],
        }}
      >
        <ambientLight intensity={2} />
        <OrbitControls enableZoom={false} />
        <ScrollControls pages={3} damping={0.25}>
          <Model />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
