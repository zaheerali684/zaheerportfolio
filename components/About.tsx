"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";

function TiltAvatar() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className="relative w-64 h-64 mx-auto cursor-pointer"
    >
      {/* Spinning rings */}
      <div
        className="absolute inset-[-16px] rounded-full border-2 border-dashed border-indigo-500/30"
        style={{ animation: "spin 20s linear infinite" }}
      />
      <div
        className="absolute inset-[-28px] rounded-full border border-dashed border-violet-500/15"
        style={{ animation: "spin 30s linear infinite reverse" }}
      />

      {/* Avatar */}
      <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-pink-500 flex items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.5)]">
        <span className="font-display text-6xl font-black text-white" style={{ textShadow: "0 0 30px rgba(255,255,255,0.3)" }}>
          ZA
        </span>
      </div>

      {/* Floating tags */}
      {[
        { label: "⚡ React.js", pos: "top-0 -right-8", color: "text-emerald-400" },
        { label: "🚀 Node.js", pos: "bottom-4 -left-8", color: "text-violet-300" },
        { label: "🎨 UI/UX", pos: "top-1/2 -right-12", color: "text-amber-400" },
      ].map((t, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.5 }}
          className={`absolute ${t.pos} bg-[#111827] border border-[#1e293b] rounded-xl px-3 py-1.5 text-xs font-bold ${t.color} shadow-lg`}
          style={{ transform: "translateZ(30px)" }}
        >
          {t.label}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-24 px-6 md:px-12">
      <div
        ref={ref}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <TiltAvatar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-display text-4xl font-black mb-4">
            About{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            I'm a Full Stack Developer and Graphic Designer passionate about
            building modern, responsive, and user-focused web applications.
            Currently pursuing BS Information Technology at the University of
            Gujrat (2022–Present).
          </p>
          <p className="text-slate-400 leading-relaxed mb-8">
            From pixel-perfect interfaces to scalable backend APIs, I love
            turning ideas into fully working digital products that stand out.
          </p>

          {/* Education cards */}
          <div className="space-y-3 mb-8">
            {[
              { degree: "BS Information Technology", school: "University of Gujrat", years: "2022 – Present", icon: "🎓" },
              { degree: "Intermediate", school: "TEVTA", years: "2019 – 2022", icon: "📚" },
            ].map((e, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#111827] border border-[#1e293b] rounded-xl px-4 py-3"
              >
                <span className="text-2xl">{e.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-white">{e.degree}</p>
                  <p className="text-xs text-slate-400">{e.school} · {e.years}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              { num: "3+", label: "Years Exp" },
              { num: "10+", label: "Projects" },
              { num: "5+", label: "Tech Stacks" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl font-black bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {s.num}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
