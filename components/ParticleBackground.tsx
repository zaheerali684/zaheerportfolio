"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 200 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);

  const mouse = useRef({ x: 0, y: 0 });

  // Generate particles
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    const palette = [
      new THREE.Color("#6366f1"),
      new THREE.Color("#a78bfa"),
      new THREE.Color("#ec4899"),
      new THREE.Color("#10b981"),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      sz[i] = Math.random() * 3 + 1;
    }

    return [pos, col, sz];
  }, [count]);

  // ✅ SAFE mouse event (FIXED)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // animation loop
  useFrame(({ clock, camera }) => {
    if (!mesh.current) return;

    const t = clock.getElapsedTime();

    mesh.current.rotation.y = t * 0.03;
    mesh.current.rotation.x = t * 0.01;

    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 0.5 - camera.position.y) * 0.05;

    camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function FloatingSpheres() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;

    const t = clock.getElapsedTime();

    group.current.children.forEach((child, i) => {
      child.position.y = Math.sin(t * 0.5 + i * 1.2) * 0.3;
      child.rotation.x = t * 0.2 + i;
      child.rotation.y = t * 0.3 + i;
    });
  });

  return (
    <group ref={group}>
      {[
        { pos: [-3, 1, -2], color: "#6366f1", size: 0.3 },
        { pos: [3, -1, -3], color: "#a78bfa", size: 0.2 },
        { pos: [0, 2, -4], color: "#ec4899", size: 0.15 },
        { pos: [-2, -2, -2], color: "#10b981", size: 0.25 },
        { pos: [4, 2, -5], color: "#f59e0b", size: 0.1 },
      ].map((s, i) => (
        <mesh key={i} position={s.pos as [number, number, number]}>
          <icosahedronGeometry args={[s.size, 1]} />
          <meshStandardMaterial
            color={s.color}
            wireframe
            opacity={0.3}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Particles count={250} />
        <FloatingSpheres />
      </Canvas>
    </div>
  );
}