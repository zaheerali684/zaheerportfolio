"use client";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedSphere() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
        />
      </Sphere>
      {/* Inner glow sphere */}
      <Sphere args={[1.05, 32, 32]}>
        <meshStandardMaterial
          color="#a78bfa"
          transparent
          opacity={0.05}
          wireframe
        />
      </Sphere>
    </Float>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-20 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 text-sm text-violet-300 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            Open to Work
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-display text-5xl md:text-7xl font-black leading-none mb-6"
          >
            Hello, I'm
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              Zaheer Ali
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-lg text-slate-400 max-w-lg mb-8 leading-relaxed"
          >
            Full Stack Developer & Graphic Designer crafting modern,
            responsive, and user-focused web experiences with passion and
            precision.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:-translate-y-1 transition-all"
            >
              View Projects →
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-[#1e293b] text-slate-300 font-semibold hover:border-indigo-500 hover:text-indigo-400 transition-all"
            >
              Let's Talk
            </a>
            <a
              href="/Zaheer-ali_Full Stack.pdf"
              download
              className="px-6 py-3 rounded-lg border border-[#1e293b] text-slate-300 font-semibold hover:border-violet-500 hover:text-violet-400 transition-all"
            >
              Download CV
            </a>
          </motion.div>

          {/* Social quick links */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex gap-4 mt-8"
          >
            {[
              { label: "GitHub", href: "https://github.com/zaheerali684" },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/zaheer-ali-/",
              },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 hover:text-white transition-colors underline underline-offset-4"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="h-[420px] hidden md:block"
        >
          <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} color="#6366f1" intensity={2} />
            <pointLight position={[-5, -3, -3]} color="#ec4899" intensity={1} />
            <AnimatedSphere />
          </Canvas>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 text-sm"
      >
        ↓
      </motion.div>
    </section>
  );
}
