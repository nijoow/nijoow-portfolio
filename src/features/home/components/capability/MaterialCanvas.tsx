'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  RoundedBox,
  View,
  useTexture,
} from '@react-three/drei';
import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ComponentRef,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import type { Group } from 'three';
import {
  PMREMGenerator,
  MathUtils,
  type Texture,
  type WebGLRenderTarget,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  useAppearance,
  type MaterialStyle,
} from '@/context/AppearanceProvider';
import type { MaterialCanvasProps, SceneInput } from './MaterialCapabilities';

class SceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch() {
    this.props.onFailure();
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

function GlassSurface({
  environment,
  material,
  lowPower,
}: {
  environment: Texture;
  material: MaterialStyle;
  lowPower: boolean;
}) {
  return (
    <MeshTransmissionMaterial
      resolution={lowPower ? 256 : 512}
      samples={lowPower ? 3 : 6}
      chromaticAberration={0.025}
      anisotropicBlur={0.03}
      envMap={environment}
      color={material === 'refraction' ? '#c8c1dd' : '#b6a0d1'}
      metalness={0.06}
      roughness={material === 'refraction' ? 0.07 : 0.22}
      transmission={material === 'refraction' ? 0.82 : 0.32}
      thickness={material === 'refraction' ? 0.8 : 0.35}
      ior={1.45}
      clearcoat={1}
      clearcoatRoughness={0.08}
      envMapIntensity={0.7}
    />
  );
}
function Sculpture({
  index,
  material,
  environment,
  input,
  motion,
  lowPower,
}: {
  index: number;
  material: MaterialStyle;
  environment: Texture;
  input: SceneInput;
  motion: boolean;
  lowPower: boolean;
}) {
  const group = useRef<Group>(null);
  const liquid = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);
  const lastImpulse = useRef(0);
  const energy = useRef(0);
  const logo = useTexture('/images/material-signature.png');
  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    if (lastImpulse.current !== input.impulse) {
      energy.current = 1;
      lastImpulse.current = input.impulse;
    }
    energy.current = MathUtils.damp(energy.current, 0, 2.8, delta);
    const drift = motion
      ? Math.sin(clock.elapsedTime * 0.55 + index) * 0.035
      : 0;
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      motion ? -input.y * 0.25 + drift : 0,
      6,
      delta,
    );
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      motion ? input.x * 0.4 + energy.current * 0.38 : 0,
      5,
      delta,
    );
    group.current.position.y = motion
      ? Math.sin(clock.elapsedTime * 0.7 + index) * 0.035
      : 0;
    const stretch =
      material === 'elastic' && motion ? energy.current * 0.12 : 0;
    group.current.scale.x = MathUtils.damp(
      group.current.scale.x,
      1 + stretch,
      8,
      delta,
    );
    group.current.scale.y = MathUtils.damp(
      group.current.scale.y,
      1 - stretch * 0.65,
      8,
      delta,
    );
    if (liquid.current)
      liquid.current.distort = motion
        ? 0.16 + energy.current * 0.24 + Number(input.active) * 0.08
        : 0.16;
  });
  const surface = (
    <GlassSurface
      environment={environment}
      material={material}
      lowPower={lowPower}
    />
  );
  return (
    <>
      <ambientLight intensity={0.18} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#e7dcff" />
      <pointLight position={[-3, 1, 2]} intensity={8} color="#7e9ff2" />
      <pointLight position={[3, -1, 1]} intensity={5} color="#d8b7e5" />

      <mesh position={[0, -0.08, -1.3]} rotation={[0, 0, -0.28]}>
        <torusGeometry args={[1.5, 0.015, 8, 90, Math.PI * 1.65]} />
        <meshBasicMaterial color="#8c78aa" transparent opacity={0.65} />
      </mesh>
      <mesh position={[-0.75, 0, -0.8]} rotation={[0, 0, -0.3]}>
        <planeGeometry args={[0.09, 1.3]} />
        <meshBasicMaterial color="#c8b7e0" toneMapped={false} />
      </mesh>
      <mesh position={[0.7, 0.1, -1]} rotation={[0, 0, 0.3]}>
        <planeGeometry args={[0.06, 1.2]} />
        <meshBasicMaterial color="#95b7d9" toneMapped={false} />
      </mesh>
      <group ref={group}>
        {material === 'ink' ? (
          <mesh
            scale={index === 1 ? [1.3, 0.65, 0.85] : [1.05, 0.86, 0.8]}
            rotation={[0.2, index * 0.4, -0.2]}
          >
            {index === 2 ? (
              <torusKnotGeometry args={[0.58, 0.2, 100, 18, 2, 3]} />
            ) : (
              <icosahedronGeometry args={[0.95, 4]} />
            )}
            <MeshDistortMaterial
              ref={liquid}
              envMap={environment}
              color="#8972b6"
              metalness={0.38}
              roughness={0.19}
              clearcoat={1}
              clearcoatRoughness={0.08}
              iridescence={0.22}
              envMapIntensity={0.65}
              distort={0.16}
              speed={motion ? 0.8 : 0}
            />
          </mesh>
        ) : (
          <GlassGeometry
            index={index}
            surface={surface}
            refraction={material === 'refraction'}
          />
        )}
        {material === 'ink' && index === 3 ? (
          <mesh position={[0.78, 0.15, 0.1]} scale={0.48}>
            <icosahedronGeometry args={[0.9, 3]} />
            <MeshDistortMaterial
              envMap={environment}
              color="#b297cf"
              metalness={0.3}
              roughness={0.2}
              clearcoat={1}
              envMapIntensity={0.65}
              distort={0.2}
              speed={motion ? 0.7 : 0}
            />
          </mesh>
        ) : null}
        {index === 0 ? (
          <mesh position={[0, -0.02, 0.6]} renderOrder={10}>
            <planeGeometry args={[1.95, 1.1]} />
            <meshBasicMaterial
              map={logo}
              transparent
              opacity={0.92}
              depthWrite={false}
              depthTest={false}
              toneMapped={false}
            />
          </mesh>
        ) : null}
      </group>
    </>
  );
}

function GlassGeometry({
  index,
  surface,
  refraction,
}: {
  index: number;
  surface: ReactNode;
  refraction: boolean;
}) {
  if (index === 0)
    return (
      <RoundedBox
        args={[2.5, 1.28, 0.32]}
        radius={0.22}
        smoothness={5}
        rotation={[0.1, -0.16, -0.1]}
      >
        {surface}
      </RoundedBox>
    );
  if (index === 1)
    return (
      <>
        {[-1, 0, 1].map((i) => (
          <RoundedBox
            key={i}
            args={[1.55, 1.03, 0.16]}
            radius={0.16}
            smoothness={4}
            position={[i * 0.38, i * 0.12, i * 0.4]}
            rotation={[0.25, -0.35, -0.18]}
          >
            {surface}
          </RoundedBox>
        ))}
      </>
    );
  if (index === 2)
    return (
      <mesh rotation={[0.5, 0.1, -0.2]}>
        <torusKnotGeometry
          args={[0.62, refraction ? 0.22 : 0.15, 110, 18, 2, 3]}
        />
        {surface}
      </mesh>
    );
  return (
    <>
      {[-1, 1].map((i) => (
        <mesh
          key={i}
          position={[i * 0.45, 0, i * 0.1]}
          rotation={[i * 0.45, i * 0.4, i * 0.25]}
        >
          <torusGeometry args={[0.62, 0.19, 20, 90]} />
          {surface}
        </mesh>
      ))}
    </>
  );
}

function Studio({
  tracks,
  inputs,
  count,
  motion,
  visible,
  lowPower,
  onReady,
  material,
}: MaterialCanvasProps & { material: MaterialStyle }) {
  const { gl, invalidate } = useThree();
  const [activeViews, setActiveViews] = useState<boolean[]>(
    Array.from({ length: count }, () => false),
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setActiveViews((previous) => {
          const next = [...previous];
          for (const entry of entries) {
            const index = tracks.current.indexOf(
              entry.target as HTMLButtonElement,
            );
            if (index >= 0) next[index] = entry.isIntersecting;
          }
          return next;
        });
      },
      { rootMargin: '60px' },
    );
    for (const element of tracks.current)
      if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [tracks, count]);
  const [environment, setEnvironment] = useState<Texture | null>(null);
  useEffect(() => {
    let target: WebGLRenderTarget | undefined;
    const frame = requestAnimationFrame(() => {
      const room = new RoomEnvironment();
      const generator = new PMREMGenerator(gl);
      target = generator.fromScene(room, 0.04);
      room.dispose();
      generator.dispose();
      setEnvironment(target.texture);
    });
    return () => {
      cancelAnimationFrame(frame);
      target?.dispose();
    };
  }, [gl]);
  useEffect(() => {
    if (!environment) return;
    onReady();
    invalidate();
  }, [onReady, invalidate, material, motion, environment]);
  useEffect(() => {
    const redraw = () => invalidate();
    window.addEventListener('scroll', redraw, { passive: true });
    return () => window.removeEventListener('scroll', redraw);
  }, [invalidate]);
  return (
    <>
      {Array.from({ length: count }, (_, index) => {
        const track = {
          get current() {
            return tracks.current[index] ?? null;
          },
        } as RefObject<HTMLElement>;
        const input = inputs.current[index];
        return input ? (
          <View key={index} track={track} index={index + 1} visible={visible}>
            {activeViews[index] && environment ? (
              <Sculpture
                index={index}
                material={material}
                environment={environment}
                input={input}
                motion={motion}
                lowPower={lowPower}
              />
            ) : null}
          </View>
        ) : null;
      })}
    </>
  );
}

export default function MaterialCanvas(props: MaterialCanvasProps) {
  const { material } = useAppearance();
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setHost(document.body));
    return () => cancelAnimationFrame(frame);
  }, []);
  if (!host) return null;
  return createPortal(
    <div className="material-canvas" aria-hidden>
      <SceneBoundary onFailure={props.onFailure}>
        <Canvas
          dpr={[1, props.lowPower ? 1 : 1.5]}
          camera={{ position: [0, 0, 5], fov: 32 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
          frameloop={props.visible && props.motion ? 'always' : 'demand'}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000', 0);
            gl.domElement.addEventListener(
              'webglcontextlost',
              props.onFailure,
              { once: true },
            );
          }}
        >
          <Suspense fallback={null}>
            <Studio {...props} material={material} />
          </Suspense>
        </Canvas>
      </SceneBoundary>
    </div>,
    host,
  );
}
