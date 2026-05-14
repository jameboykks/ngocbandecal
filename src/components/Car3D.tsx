import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Edges, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

type FinishKey = 'gloss' | 'matte' | 'satin' | 'metallic' | 'chrome';

const FINISH_PARAMS: Record<FinishKey, { metalness: number; roughness: number }> = {
  gloss:    { metalness: 0.5,  roughness: 0.22 },
  matte:    { metalness: 0.1,  roughness: 0.85 },
  satin:    { metalness: 0.4,  roughness: 0.45 },
  metallic: { metalness: 0.95, roughness: 0.28 },
  chrome:   { metalness: 1.0,  roughness: 0.05 },
};

function useCarBodyGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-2.2, 0.35);
    s.lineTo(2.2, 0.35);
    s.lineTo(2.4, 0.55);
    s.lineTo(2.45, 0.85);
    s.bezierCurveTo(2.45, 1.05, 2.0, 1.1, 1.5, 1.15);
    s.bezierCurveTo(1.0, 1.2, 0.6, 1.45, 0.1, 1.5);
    s.bezierCurveTo(-0.4, 1.55, -0.8, 1.45, -1.2, 1.25);
    s.bezierCurveTo(-1.6, 1.05, -2.0, 0.95, -2.3, 0.85);
    s.lineTo(-2.45, 0.7);
    s.lineTo(-2.45, 0.5);
    s.lineTo(-2.2, 0.35);

    const win = new THREE.Path();
    win.moveTo(-1.0, 1.15);
    win.bezierCurveTo(-0.5, 1.4, 0.3, 1.4, 0.9, 1.1);
    win.lineTo(1.1, 0.95);
    win.lineTo(-1.0, 0.95);
    win.lineTo(-1.0, 1.15);
    s.holes.push(win);

    return new THREE.ExtrudeGeometry(s, {
      depth: 1.7,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.06,
      bevelThickness: 0.06,
      curveSegments: 16,
    });
  }, []);
}

function useWheelGeometry() {
  return useMemo(() => new THREE.CylinderGeometry(0.42, 0.42, 0.32, 20), []);
}
function useRimGeometry() {
  return useMemo(() => new THREE.CylinderGeometry(0.27, 0.27, 0.34, 16), []);
}

function Wheel({ position, wheelGeo, rimGeo }: { position: [number, number, number]; wheelGeo: THREE.BufferGeometry; rimGeo: THREE.BufferGeometry }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh geometry={wheelGeo}>
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} metalness={0.05} />
      </mesh>
      <mesh geometry={rimGeo}>
        <meshStandardMaterial color="#dfc693" roughness={0.3} metalness={0.9} />
      </mesh>
    </group>
  );
}

function Headlight({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[0, 0, 0.3]}>
      <boxGeometry args={[0.05, 0.18, 0.4]} />
      <meshStandardMaterial color="#fff8e1" emissive="#ffe9a8" emissiveIntensity={1.4} />
    </mesh>
  );
}

function Taillight({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.05, 0.12, 0.55]} />
      <meshStandardMaterial color="#3a0808" emissive="#c83030" emissiveIntensity={1.3} />
    </mesh>
  );
}

function Car({ color, finish }: { color: string; finish: FinishKey }) {
  const ref = useRef<THREE.Group>(null);
  const bodyGeo = useCarBodyGeometry();
  const wheelGeo = useWheelGeometry();
  const rimGeo = useRimGeometry();
  const params = FINISH_PARAMS[finish];

  const { mouse } = useThree();
  useFrame((state) => {
    if (!ref.current) return;
    const targetY = mouse.x * 0.4 - state.clock.elapsedTime * 0.18;
    const targetX = mouse.y * 0.15 - 0.05;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.05;
  });

  return (
    <group ref={ref} position={[0, -0.4, 0]} scale={0.85}>
      <mesh geometry={bodyGeo} position={[0, 0, -0.85]}>
        <meshStandardMaterial
          color={color}
          metalness={params.metalness}
          roughness={params.roughness}
          envMapIntensity={1.1}
        />
        <Edges threshold={28} color="#dfc693" />
      </mesh>

      <Wheel position={[-1.45, -0.05, -0.9]} wheelGeo={wheelGeo} rimGeo={rimGeo} />
      <Wheel position={[1.45, -0.05, -0.9]} wheelGeo={wheelGeo} rimGeo={rimGeo} />
      <Wheel position={[-1.45, -0.05, 0.9]} wheelGeo={wheelGeo} rimGeo={rimGeo} />
      <Wheel position={[1.45, -0.05, 0.9]} wheelGeo={wheelGeo} rimGeo={rimGeo} />

      <Headlight position={[-2.4, 0.7, -0.6]} />
      <Headlight position={[-2.4, 0.7, 0.6]} />
      <Taillight position={[2.42, 0.85, -0.55]} />
      <Taillight position={[2.42, 0.85, 0.55]} />

      <mesh position={[0, 0.55, 0.86]}>
        <boxGeometry args={[4.4, 0.04, 0.02]} />
        <meshStandardMaterial color="#dfc693" emissive="#a3843a" emissiveIntensity={0.4} metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.55, -0.86]}>
        <boxGeometry args={[4.4, 0.04, 0.02]} />
        <meshStandardMaterial color="#dfc693" emissive="#a3843a" emissiveIntensity={0.4} metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Particles({ count = 28 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = (seed: number) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + rand(i + 1) * 2;
      const a = rand(i + 101) * Math.PI * 2;
      const y = (rand(i + 201) - 0.5) * 4;
      p[i * 3] = Math.cos(a) * r;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = Math.sin(a) * r;
    }
    return p;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial color="#dfc693" size={0.06} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  );
}

function GridFloor() {
  return (
    <group position={[0, -0.78, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[6, 48]} />
        <meshStandardMaterial color="#f2f0e8" metalness={0.18} roughness={0.62} />
      </mesh>
      <gridHelper args={[12, 20, '#a3843a', '#d8c9ad']} position={[0, 0.001, 0]} />
    </group>
  );
}

export default function Car3D({ color, finish }: { color: string; finish: FinishKey }) {
  return (
    <div className="absolute inset-0">
      <Canvas
        frameloop="always"
        dpr={[1, 1.25]}
        camera={{ position: [4.5, 2.2, 5.2], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <color attach="background" args={['#f8f7f3']} />

        <ambientLight intensity={0.75} />
        <directionalLight position={[5, 8, 5]} intensity={1.1} />
        <pointLight position={[-5, 3, -3]} intensity={0.5} color="#dfc693" />

        <Car color={color} finish={finish} />
        <Particles />
        <GridFloor />

        <ContactShadows position={[0, -0.78, 0]} opacity={0.4} scale={9} blur={2.6} far={2.4} resolution={256} />
      </Canvas>
    </div>
  );
}
