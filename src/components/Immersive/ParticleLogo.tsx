'use client';

import { COLOR_TOKENS } from '@/lib/designTokens';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import type { RootState } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type {
  ParticleGeometryRequest,
  ParticleGeometryResult,
} from './particleGeometry.types';

const ENTRANCE_SEC = 3;
const BURST_SEC = 2.4;
const BURST_PEAK = 0.95;
const AUTO_BURST_SEC = 10;
const IDLE_WAVE_AMP = 0.06;
const PULSE_AMP = 0.4;
const INTRO_SPIN_SPEED = 0.12;
const POINTER_TILT_X = 0.3;
const POINTER_TILT_Y = 0.2;
const SWING_SPEED = 0.3;
const SWING_AMP = 0.5;

const MAX_POINT_SIZE = 15;

const PARTICLE_COLORS = {
  deep: new THREE.Color(COLOR_TOKENS.brand.violet).multiplyScalar(1.08),
  mid: new THREE.Color(COLOR_TOKENS.brand.lavender).multiplyScalar(1.08),
  cool: new THREE.Color(COLOR_TOKENS.brand.cool).multiplyScalar(1.05),
  glint: new THREE.Color(COLOR_TOKENS.brand.lavender).multiplyScalar(1.14),
} as const;

interface ParticleLogoProps {
  interactive?: boolean;
  count?: number;
  sizeScale?: number;
  jitter?: number;
  rotate?: boolean;
  clickBurst?: boolean;
  burstSignal?: number;
  entranceSignal?: number;
  animateEntrance?: boolean;
  onReady?: () => void;
}

function entranceEnvelope(t: number): number {
  const entrance = 1 - THREE.MathUtils.clamp(t / ENTRANCE_SEC, 0, 1);
  return entrance * entrance * entrance;
}

function idleWave(t: number): number {
  return (Math.sin(t * 0.5) * 0.5 + 0.5) * IDLE_WAVE_AMP;
}

function pulseWave(t: number): number {
  return Math.pow(Math.max(0, Math.sin(t * 0.7)), 10) * PULSE_AMP;
}

function burstEnvelope(sinceBurst: number): number {
  const bp = sinceBurst / BURST_SEC;
  return bp >= 0 && bp <= 1 ? Math.sin(Math.PI * bp) * BURST_PEAK : 0;
}

function projectPointerToWorld(state: RootState, out: THREE.Vector3) {
  const cam = state.camera;
  out.set(state.pointer.x, state.pointer.y, 0.5).unproject(cam);
  out.sub(cam.position);
  const planeT = -cam.position.z / (out.z || -1);
  out.multiplyScalar(planeT).add(cam.position);
}

const vertexShader = `
  uniform float uProgress;
  uniform float uTime;
  uniform float uSizeScale;
  uniform float uJitterBase;
  uniform float uMaxSize;
  uniform vec3 uMouse;
  uniform float uRadius;
  uniform float uStrength;
  attribute vec3 aScatter;
  attribute float aRandom;
  varying float vRand;
  varying float vDepth;
  varying float vMotion;

  void main() {
    vRand = aRandom;
    float p = smoothstep(0.0, 1.0, clamp((uProgress - aRandom * 0.35) / 0.65, 0.0, 1.0));

    vec3 base = position + aScatter * p;
    float ang = p * 3.0;
    float ca = cos(ang);
    float sa = sin(ang);
    base.xz = mat2(ca, -sa, sa, ca) * base.xz;

    float t = uTime * 0.6 + aRandom * 6.2831;
    base += vec3(sin(t), cos(t * 1.3), sin(t * 0.7)) * (uJitterBase + 0.12 * p);

    vec4 world = modelMatrix * vec4(base, 1.0);
    vec3 toM = world.xyz - uMouse;
    float dd = length(toM);
    float force = smoothstep(uRadius, 0.0, dd) * uStrength;
    world.xyz += normalize(toM + 0.0001) * force;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    vDepth = smoothstep(-1.8, 1.8, base.z);
    vMotion = uProgress;

    float glint = smoothstep(0.86, 1.0, aRandom);
    float size = (mix(6.2, 11.8, aRandom) + glint * 1.6) * mix(1.0, 1.28, uProgress);
    gl_PointSize = min(size * uSizeScale * (8.0 / -mv.z), uMaxSize);
  }
`;

const fragmentShader = `
  uniform vec3 uColorDeep;
  uniform vec3 uColorMid;
  uniform vec3 uColorCool;
  uniform vec3 uColorGlint;
  varying float vRand;
  varying float vDepth;
  varying float vMotion;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    float palette = fract(vRand * 1.618 + vDepth * 0.24);
    vec3 col = palette < 0.62
      ? mix(uColorDeep, uColorMid, palette / 0.62)
      : mix(uColorMid, uColorCool, (palette - 0.62) / 0.38);

    float body = pow(smoothstep(0.5, 0.02, d), 1.35);
    float rim = smoothstep(0.49, 0.34, d) - smoothstep(0.31, 0.16, d);
    float glintSeed = smoothstep(0.86, 1.0, vRand);
    float specular = pow(
      smoothstep(0.22, 0.0, length(c - vec2(-0.14, 0.14))),
      2.4
    ) * glintSeed;

    float reflection = min(rim * 0.2 + specular * 0.72, 0.78);
    col = mix(col, uColorGlint, reflection);

    float density = mix(0.7, 0.92, fract(vRand * 7.13));
    float alpha = min(
      body * density * mix(0.82, 1.12, vMotion) + rim * 0.08 + specular * 0.12,
      0.94
    );
    gl_FragColor = vec4(col, alpha);
  }
`;

const glintFragmentShader = `
  uniform vec3 uColorCool;
  uniform vec3 uColorGlint;
  varying float vRand;
  varying float vDepth;
  varying float vMotion;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    float glintSeed = smoothstep(0.86, 1.0, vRand);
    float body = pow(smoothstep(0.5, 0.0, d), 1.65);
    float specular = pow(
      smoothstep(0.25, 0.0, length(c - vec2(-0.14, 0.14))),
      2.1
    );
    vec3 col = mix(uColorCool, uColorGlint, min(specular + vDepth * 0.2, 1.0));
    float alpha = min(
      (body * 0.34 + specular * 0.72) * glintSeed * mix(0.78, 1.2, vMotion),
      0.88
    );
    gl_FragColor = vec4(col, alpha);
  }
`;

export function ParticleLogo({
  interactive = true,
  count = 40000,
  sizeScale = 0.07,
  jitter = 0.003,
  rotate = true,
  clickBurst = false,
  burstSignal = 0,
  entranceSignal = 0,
  animateEntrance = true,
  onReady,
}: ParticleLogoProps) {
  const { nodes } = useGLTF('/3D/nijoowPurple.glb');
  const logoMesh = nodes.Curve003;
  if (!(logoMesh instanceof THREE.Mesh)) {
    throw new Error('nijoow 로고 메시를 찾을 수 없습니다.');
  }

  const group = useRef<THREE.Group>(null);
  const bodyMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const glintMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const burstRef = useRef(-Infinity);
  const autoRef = useRef(0);
  const startedAtRef = useRef<number | null>(null);
  const rotationStartedAtRef = useRef<number | null>(null);
  const lastBurstSignalRef = useRef(burstSignal);
  const lastEntranceSignalRef = useRef(entranceSignal);
  const [geometryData, setGeometryData] =
    useState<ParticleGeometryResult | null>(null);
  const mouseWorldRef = useRef(new THREE.Vector3());

  useEffect(() => {
    const worker = new Worker(
      new URL('./particleGeometry.worker.ts', import.meta.url),
      { type: 'module' },
    );
    const sourcePositions = new Float32Array(
      logoMesh.geometry.getAttribute('position').array,
    );
    const sourceIndices = logoMesh.geometry.index
      ? new Uint32Array(logoMesh.geometry.index.array)
      : null;
    const request: ParticleGeometryRequest = {
      positions: sourcePositions,
      indices: sourceIndices,
      count,
    };
    const transfer: Transferable[] = [sourcePositions.buffer];
    if (sourceIndices) transfer.push(sourceIndices.buffer);

    worker.onmessage = (event: MessageEvent<ParticleGeometryResult>) => {
      setGeometryData(event.data);
    };
    worker.onerror = (event) => {
      console.error('Particle geometry worker failed', event.error);
    };
    worker.postMessage(request, transfer);

    return () => worker.terminate();
  }, [count, logoMesh.geometry]);

  const geometries = useMemo(() => {
    if (!geometryData) return null;

    const full = new THREE.BufferGeometry();
    full.setAttribute(
      'position',
      new THREE.BufferAttribute(geometryData.positions, 3),
    );
    full.setAttribute(
      'aScatter',
      new THREE.BufferAttribute(geometryData.scatters, 3),
    );
    full.setAttribute(
      'aRandom',
      new THREE.BufferAttribute(geometryData.randoms, 1),
    );

    const glint = new THREE.BufferGeometry();
    glint.setAttribute(
      'position',
      new THREE.BufferAttribute(geometryData.glintPositions, 3),
    );
    glint.setAttribute(
      'aScatter',
      new THREE.BufferAttribute(geometryData.glintScatters, 3),
    );
    glint.setAttribute(
      'aRandom',
      new THREE.BufferAttribute(geometryData.glintRandoms, 1),
    );

    return { full, glint };
  }, [geometryData]);

  useEffect(() => {
    if (!geometries) return;
    onReady?.();
    return () => {
      geometries.full.dispose();
      geometries.glint.dispose();
    };
  }, [geometries, onReady]);

  useEffect(() => {
    if (!geometries) return;
    const bodyMaterial = bodyMaterialRef.current;
    const glintMaterial = glintMaterialRef.current;
    return () => {
      bodyMaterial?.dispose();
      glintMaterial?.dispose();
    };
  }, [geometries]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: animateEntrance ? 1 : 0 },
      uTime: { value: 0 },
      uSizeScale: { value: sizeScale },
      uJitterBase: { value: jitter },
      uMouse: { value: new THREE.Vector3(999, 999, 999) },
      uRadius: { value: 1.3 },
      uStrength: { value: 0.9 },
      uMaxSize: { value: MAX_POINT_SIZE },
      uColorDeep: { value: PARTICLE_COLORS.deep },
      uColorMid: { value: PARTICLE_COLORS.mid },
      uColorCool: { value: PARTICLE_COLORS.cool },
      uColorGlint: { value: PARTICLE_COLORS.glint },
    }),
    [animateEntrance, sizeScale, jitter],
  );

  useFrame((state) => {
    const absoluteTime = state.clock.elapsedTime;

    if (entranceSignal !== lastEntranceSignalRef.current) {
      lastEntranceSignalRef.current = entranceSignal;
      startedAtRef.current = absoluteTime;
      burstRef.current = -Infinity;
      autoRef.current = 0;
    }
    startedAtRef.current ??= absoluteTime;
    const t = absoluteTime - startedAtRef.current;

    if (clickBurst && t - autoRef.current >= AUTO_BURST_SEC) {
      autoRef.current = t;
      burstRef.current = t;
    }
    if (clickBurst && burstSignal !== lastBurstSignalRef.current) {
      lastBurstSignalRef.current = burstSignal;
      autoRef.current = t;
      burstRef.current = t;
    }

    const progress = Math.max(
      animateEntrance ? entranceEnvelope(t) : 0,
      interactive ? idleWave(t) : 0,
      interactive ? pulseWave(t) : 0,
      burstEnvelope(t - burstRef.current),
    );
    uniforms.uProgress.value = progress;
    uniforms.uTime.value = t;

    if (interactive) {
      projectPointerToWorld(state, mouseWorldRef.current);
      uniforms.uMouse.value.copy(mouseWorldRef.current);
    }

    if (!group.current) return;
    if (interactive) {
      group.current.rotation.y =
        t * INTRO_SPIN_SPEED + state.pointer.x * POINTER_TILT_X;
      group.current.rotation.x = -state.pointer.y * POINTER_TILT_Y;
    } else {
      if (rotate) {
        rotationStartedAtRef.current ??= absoluteTime;
        const rotationTime = absoluteTime - rotationStartedAtRef.current;
        group.current.rotation.y =
          Math.sin(rotationTime * SWING_SPEED) * SWING_AMP;
      } else {
        rotationStartedAtRef.current = null;
        group.current.rotation.y = 0;
      }
      group.current.rotation.x = 0;
    }
  });

  if (!geometries) return null;

  return (
    <group ref={group} dispose={null}>
      <points geometry={geometries.full}>
        <shaderMaterial
          ref={bodyMaterialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
      <points geometry={geometries.glint}>
        <shaderMaterial
          ref={glintMaterialRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={glintFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
