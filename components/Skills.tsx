"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skillCategories = [
  {
    icon: "⚛️",
    title: "Frontend",
    color: "from-indigo-500/20 to-violet-500/20",
    border: "border-indigo-500/20",
    tags: ["HTML5", "CSS3", "JavaScript ES6+", "React.js", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: "🔧",
    title: "Backend",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/20",
    tags: ["Node.js", "Express.js", "MongoDB", "Firebase", "RESTful APIs"],
  },
  {
    icon: "🛠️",
    title: "Tools & Platforms",
    color: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/20",
    tags: ["Git & GitHub", "VS Code", "Postman", "Vercel", "Linux (Ubuntu)"],
  },
  {
    icon: "🎨",
    title: "Design",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/20",
    tags: ["Figma", "Canva", "Adobe Photoshop", "UI/UX Design"],
  },
];

function SkillCard({
  skill,
  index,
  inView,
}: {
  skill: (typeof skillCategories)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, rotateX: 3, scale: 1.02 }}
      style={{ transformStyle: "preserve-3d", perspective: 600 }}
      className={`bg-[#111827] border ${skill.border} rounded-2xl p-6 cursor-default bg-gradient-to-br ${skill.color} backdrop-blur-sm hover:shadow-[0_20px_60px_rgba(99,102,241,0.15)] transition-shadow`}
    >
      <div className="text-4xl mb-4">{skill.icon}</div>
      <h3 className="font-display font-bold text-lg text-violet-300 mb-4">
        {skill.title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skill.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium rounded-md hover:bg-indigo-500/20 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 px-6 md:px-12">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl font-black mb-3">
            My{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-slate-400">Technologies I work with</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((skill, i) => (
            <SkillCard key={skill.title} skill={skill} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
