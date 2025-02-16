import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="w-[100vw] h-[100vh] bg-accent">
      <Canvas>
        <OrbitControls />
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}
