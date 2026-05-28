"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    emoji: "🧋",
    title: "Shake Hub",
    description:
      "A full-stack milkshake ordering platform with smooth UI built using React, Tailwind CSS, and Framer Motion. Backend in Node.js, Express, and MongoDB.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    live: "https://shakehub.netlify.app/",
    github: "https://github.com/zaheerali684/shake-hub-frontend",
    gradient: "from-emerald-900/50 to-teal-900/50",
    glow: "shadow-emerald-500/10",
  },
  {
    emoji: "🖼️",
    title: "Apex Presentation",
    description:
      "A modern, visually engaging website showcasing creative projects with sleek design, smooth animations, and fully responsive layouts.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    live: "https://apexpresentation.netlify.app/",
    github: "https://github.com/zaheerali684/Apex-presentation",
    gradient: "from-indigo-900/50 to-purple-900/50",
    glow: "shadow-indigo-500/10",
  },
  {
    emoji: "💼",
    title: "Portfolio Website",
    description:
      "Personal portfolio built with Next.js and Tailwind CSS showcasing skills, education, and projects with elegant animations.",
    tags: ["Next.js", "Tailwind CSS", "Three.js", "Framer Motion"],
    live: "https://zaheeralidev.vercel.app",
    github: "#",
    gradient: "from-slate-900/50 to-gray-900/50",
    glow: "shadow-slate-500/10",
  },
];

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [12, -12]);
  const rotateY = useTransform(x, [-80, 80], [-12, 12]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className={`bg-[#111827] border border-[#1e293b] rounded-2xl overflow-hidden hover:border-indigo-500/40 hover:shadow-2xl ${project.glow} transition-all duration-300 cursor-default`}
    >
      {/* Thumbnail */}
      <div className={`h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
        <motion.span
          whileHover={{ scale: 1.2 }}
          className="text-6xl z-10"
        >
          {project.emoji}
        </motion.span>
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,.3) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Body */}
      <div className="p-6" style={{ transform: "translateZ(10px)" }}>
        <h3 className="font-display text-xl font-bold mb-3">{project.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-sm rounded-lg hover:bg-indigo-500 hover:text-white transition-all"
          >
            ↗ Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-[#1e293b] text-slate-400 text-sm rounded-lg hover:text-white hover:border-slate-500 transition-all"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="py-24 px-6 md:px-12">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl font-black mb-3">
            Featured{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-400">Things I've built</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
