import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls, useGLTF, useProgress } from '@react-three/drei';
import * as THREE from 'three';

type ModelSize = { width: number; height: number; length: number };

type FinishKey = 'gloss' | 'matte' | 'satin' | 'metallic' | 'chrome';
type ViewKey = 'exterior' | 'interior' | 'cockpit';

const FINISH_PARAMS: Record<FinishKey, { metalness: number; roughness: number; clearcoat: number; clearcoatRoughness: number }> = {
  gloss:    { metalness: 0.6,  roughness: 0.18, clearcoat: 1.0, clearcoatRoughness: 0.04 },
  matte:    { metalness: 0.1,  roughness: 0.85, clearcoat: 0.1, clearcoatRoughness: 0.6  },
  satin:    { metalness: 0.45, roughness: 0.40, clearcoat: 0.5, clearcoatRoughness: 0.25 },
  metallic: { metalness: 0.95, roughness: 0.28, clearcoat: 0.8, clearcoatRoughness: 0.15 },
  chrome:   { metalness: 1.0,  roughness: 0.05, clearcoat: 1.0, clearcoatRoughness: 0.02 },
};

type CarProps = {
  modelUrl: string;
  bodyColor: string;
  finish: FinishKey;
  seatColor: string;
  trimColor: string;
  stitchingColor: string;
  rimColor: string;
  view: ViewKey;
};

function CarModel({ modelUrl, bodyColor, finish, seatColor, trimColor, stitchingColor, rimColor, onSize }: Omit<CarProps, 'view'> & { onSize: (s: ModelSize) => void }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelUrl);

  const cloned = useMemo(() => scene.clone(true), [scene]);

  // Normalize position: center horizontally, sit on y=0. Report size for camera positioning.
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    cloned.position.x -= center.x;
    cloned.position.y -= box.min.y;
    cloned.position.z -= center.z;
    onSize({ width: size.x, height: size.y, length: size.z });
  }, [cloned, onSize]);

  // Materials created ONCE — properties mutated on prop change so GPU resources aren't leaked.
  const mats = useMemo(() => ({
    body: new THREE.MeshPhysicalMaterial({ envMapIntensity: 1.4 }),
    glass: new THREE.MeshPhysicalMaterial({
      color: '#1a1a1a',
      metalness: 0.25,
      roughness: 0.05,
      transmission: 0.55,
      transparent: true,
      opacity: 0.6,
      envMapIntensity: 1.2,
    }),
    rim: new THREE.MeshStandardMaterial({ metalness: 0.9, roughness: 0.25 }),
    tire: new THREE.MeshStandardMaterial({ color: '#0a0a0a', roughness: 0.92, metalness: 0.05 }),
    seat: new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0.05 }),
    trim: new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0.15 }),
    stitching: new THREE.MeshStandardMaterial({
      emissiveIntensity: 0.45,
      roughness: 0.55,
      metalness: 0.1,
    }),
    chrome: new THREE.MeshStandardMaterial({ color: '#e8e8ec', metalness: 1, roughness: 0.05 }),
    brake: new THREE.MeshStandardMaterial({ color: '#c0392b', metalness: 0.6, roughness: 0.35 }),
    carbon: new THREE.MeshStandardMaterial({ color: '#1c1c20', metalness: 0.4, roughness: 0.6 }),
    carpet: new THREE.MeshStandardMaterial({ color: '#0a0a0a', roughness: 0.95, metalness: 0 }),
    headLight: new THREE.MeshStandardMaterial({ color: '#fff8e1', emissive: '#ffe9a8', emissiveIntensity: 0.8 }),
    tailLight: new THREE.MeshStandardMaterial({ color: '#3a0808', emissive: '#c83030', emissiveIntensity: 0.9 }),
    led: new THREE.MeshStandardMaterial({ color: '#fff', emissive: '#ffeacc', emissiveIntensity: 1.2 }),
  }), []);

  // Bind materials to meshes once per cloned scene — keyword matching across EN + ES + material-name conventions.
  useEffect(() => {
    const has = (n: string, ...keys: string[]) => keys.some((k) => n.includes(k));
    cloned.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      const name = mesh.name.toLowerCase();
      const matName = ((mesh.material as THREE.Material)?.name || '').toLowerCase();
      const n = `${name} ${matName}`;

      // Order matters: most-specific first. Skip body/chrome until after all sub-parts checked.
      if (has(n, 'tire', 'tyre', 'rubber', 'cubierta', 'neumatico')) mesh.material = mats.tire;
      else if (has(n, 'rim', 'hub', 'spoke', 'llanta', 'cubo') || /(wheel|rueda)[-_]?(fl|fr|rl|rr|002)/.test(n)) mesh.material = mats.rim;
      else if (has(n, 'brake', 'caliper', 'disc', 'freno')) mesh.material = mats.brake;
      else if (has(n, 'glass', 'window', 'windshield', 'windscreen', 'cristal', 'vidrio', 'parabrisas')) mesh.material = mats.glass;
      else if (has(n, 'taillight', 'tail_light', 'tail-light', 'rearlight', 'rear_light', 'brakelight', 'luz_trasera', 'luz-trasera') || has(n, 'lights_red', 'glass_-_red', 'glass - red')) mesh.material = mats.tailLight;
      else if (has(n, 'headlight', 'headlamp', 'fog_light', 'foco_delantero', 'foco-delantero', 'luz_delantera', 'luz-delantera') || n === 'lights' || n.endsWith(' lights') || has(matName, 'csr2_light', 'headlight_metal', 'headligth')) mesh.material = mats.headLight;
      else if (has(n, 'led', 'interior_light', 'dome_light', 'tira_led', 'luz_guino')) mesh.material = mats.led;
      else if (has(n, 'carbon')) mesh.material = mats.carbon;
      else if (has(n, 'carpet', 'floor_mat', 'floor-mat', 'floor-carpet')) mesh.material = mats.carpet;
      // McLaren-specific interior split (most-specific first): Tilling → stitching pattern, A → trim accent, plain Interior → seat surface
      else if (has(matName, 'csr2_interiortilling')) mesh.material = mats.stitching;
      else if (has(matName, 'csr2_interiora')) mesh.material = mats.trim;
      else if (has(matName, 'csr2_interior')) mesh.material = mats.seat;
      else if (has(n, 'seat', 'leather', 'cushion', 'asiento')) mesh.material = mats.seat;
      else if (has(n, 'stitching', 'stitch', 'accent_red')) mesh.material = mats.stitching;
      else if (has(n, 'dash', 'console', 'door_panel', 'door-panel', 'interior_dark', 'trim_dark', 'door_card', 'taplo', 'tablero') || /(^|_| )interior(_|$| )/.test(n) || has(matName, 'plastic_ext')) mesh.material = mats.trim;
      else if (has(n, 'steering')) mesh.material = mats.trim;
      else if (has(n, 'chrome', 'tornillos', 'tuercas') || has(matName, 'metal_chrome', 'metal-chrome', 'metal_silver', 'chrome', 'stainlesssteel') || /^(trim|metal)$/.test(name)) mesh.material = mats.chrome;
      else if (has(n, 'sennapaint', 'csr2_coloured', 'car_paint', 'carpaint', 'body_color', 'paint')) mesh.material = mats.body;
      else if (has(n, 'body', 'shell', 'hood', 'bonnet', 'door', 'fender', 'bumper', 'trunk', 'boot', 'roof', 'pillar', 'carroceria', 'puerta', 'capó', 'parachoques') || /^(body|blue|yellow_trim|main)$/.test(name)) {
        mesh.material = mats.body;
      }
      // Unmatched meshes keep their original material from the GLB.
    });
  }, [cloned, mats]);

  // Live-update colors without recreating materials.
  useEffect(() => { mats.body.color.set(bodyColor); }, [bodyColor, mats]);
  useEffect(() => { mats.seat.color.set(seatColor); }, [seatColor, mats]);
  useEffect(() => { mats.trim.color.set(trimColor); }, [trimColor, mats]);
  useEffect(() => {
    mats.stitching.color.set(stitchingColor);
    mats.stitching.emissive.set(stitchingColor);
  }, [stitchingColor, mats]);
  useEffect(() => { mats.rim.color.set(rimColor); }, [rimColor, mats]);

  useEffect(() => {
    const p = FINISH_PARAMS[finish];
    mats.body.metalness = p.metalness;
    mats.body.roughness = p.roughness;
    mats.body.clearcoat = p.clearcoat;
    mats.body.clearcoatRoughness = p.clearcoatRoughness;
    mats.body.needsUpdate = true;
  }, [finish, mats]);

  return (
    <group ref={group}>
      <primitive object={cloned} />
    </group>
  );
}

function CameraRig({ view, size }: { view: ViewKey; size: ModelSize | null }) {
  const controlsRef = useRef<any>(null);
  const transitionT = useRef(1);
  const prevView = useRef<ViewKey>(view);
  const prevSize = useRef<ModelSize | null>(null);

  // Compute camera positions dynamically from model bounding box.
  const { camPos, camLook, minDist, maxDist } = useMemo(() => {
    const s = size ?? { width: 2, height: 1.3, length: 4.5 };
    const diag = Math.hypot(s.width, s.length);
    const presets = {
      exterior: {
        pos: new THREE.Vector3(diag * 0.9, s.height * 1.2, diag * 1.0),
        look: new THREE.Vector3(0, s.height * 0.45, 0),
      },
      interior: {
        // Cabin overview from driver area looking forward through windshield
        pos: new THREE.Vector3(-s.width * 0.2, s.height * 0.55, s.length * 0.15),
        look: new THREE.Vector3(0, s.height * 0.45, -s.length * 0.4),
      },
      cockpit: {
        // Driver POV: eye-level behind steering wheel, looking down/forward at the wheel + dashboard
        pos: new THREE.Vector3(-s.width * 0.22, s.height * 0.62, s.length * 0.18),
        look: new THREE.Vector3(-s.width * 0.20, s.height * 0.42, -s.length * 0.02),
      },
    };
    const p = presets[view] ?? presets.exterior;
    return {
      camPos: p.pos,
      camLook: p.look,
      minDist: view === 'exterior' ? diag * 0.55 : s.length * 0.06,
      maxDist: view === 'exterior' ? diag * 2.5 : s.length * 0.9,
    };
  }, [size, view]);

  useEffect(() => {
    if (prevView.current !== view) {
      transitionT.current = 1;
      prevView.current = view;
    }
  }, [view]);

  useEffect(() => {
    if (size && prevSize.current !== size) {
      transitionT.current = 1;
      prevSize.current = size;
    }
  }, [size]);

  useFrame(({ camera }) => {
    if (transitionT.current > 0.005) {
      camera.position.lerp(camPos, 0.1);
      if (controlsRef.current) {
        controlsRef.current.target.lerp(camLook, 0.1);
      }
      transitionT.current *= 0.93;
    }
  });

  const isInside = view !== 'exterior';
  return (
    <OrbitControls
      ref={controlsRef}
      autoRotate={view === 'exterior'}
      autoRotateSpeed={0.6}
      enablePan={false}
      enableZoom
      minDistance={minDist}
      maxDistance={maxDist}
      maxPolarAngle={isInside ? Math.PI / 1.5 : Math.PI / 2.05}
      minPolarAngle={isInside ? Math.PI / 6 : 0.15}
      enableDamping
      dampingFactor={0.1}
    />
  );
}

type Car3DProps = {
  modelUrl: string;
  bodyColor: string;
  finish: FinishKey;
  seatColor: string;
  trimColor: string;
  stitchingColor: string;
  rimColor: string;
  view: ViewKey;
};

export default function Car3D(props: Car3DProps) {
  const [size, setSize] = useState<ModelSize | null>(null);
  const shadowScale = size ? Math.max(size.width, size.length) * 1.6 : 9;

  return (
    <div className="absolute inset-0">
      <Canvas
        frameloop="always"
        dpr={[1, 1.25]}
        camera={{ position: [4.5, 1.8, 5.2], fov: 38 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'default', preserveDrawingBuffer: false }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn('[Car3D] WebGL context lost');
          });
        }}
      >
        <color attach="background" args={['#f4f2ec']} />

        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 8, 5]} intensity={1.0} />
        <directionalLight position={[-4, 3, -3]} intensity={0.35} color="#dfc693" />

        {/* Suspense INSIDE Canvas keeps the WebGL context alive across model swaps. */}
        <Suspense fallback={null}>
          <CarModel
            modelUrl={props.modelUrl}
            bodyColor={props.bodyColor}
            finish={props.finish}
            seatColor={props.seatColor}
            trimColor={props.trimColor}
            stitchingColor={props.stitchingColor}
            rimColor={props.rimColor}
            onSize={setSize}
          />
        </Suspense>

        <ContactShadows position={[0, 0, 0]} opacity={0.45} scale={shadowScale} blur={2.6} far={2.4} resolution={256} />

        <CameraRig view={props.view} size={size} />
      </Canvas>
      <LoadingOverlay />
    </div>
  );
}

function LoadingOverlay() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-bg-card/40 backdrop-blur-[2px]">
      <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin mb-3" />
      <div className="text-[11px] tracking-[0.3em] uppercase text-accent">Đang tải model</div>
      <div className="text-xs text-text-muted mt-1 font-serif italic">{progress.toFixed(0)}%</div>
    </div>
  );
}
