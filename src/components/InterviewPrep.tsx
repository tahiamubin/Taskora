"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiAlertCircle,
  FiBarChart2,
  FiBookOpen,
  FiCheckCircle,
  FiClipboard,
  FiCpu,
  FiList,
} from "react-icons/fi";

const features: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <FiClipboard className="h-5 w-5" />,
    title: "Create preparation plans",
    desc: "Build a plan around a role, a company or an interview date.",
  },
  {
    icon: <FiList className="h-5 w-5" />,
    title: "Add topics and track completion",
    desc: "Break the plan into topics and tick them off as you go.",
  },
  {
    icon: <FiBarChart2 className="h-5 w-5" />,
    title: "Progress bars",
    desc: "See at a glance how ready you are, topic by topic.",
  },
  {
    icon: <FiCpu className="h-5 w-5" />,
    title: "AI-powered job description analysis",
    desc: "Paste a job post and get the skills to focus on, plus gaps in your plan.",
  },
];

const topics: { name: string; pct: number }[] = [
  { name: "Arrays & Hashing", pct: 100 },
  { name: "Dynamic Programming", pct: 60 },
  { name: "System Design", pct: 25 },
  { name: "SQL & Databases", pct: 0 },
];

const detected: string[] = ["Node.js", "REST APIs", "SQL", "System Design"];
const gaps: string[] = ["Caching", "Docker"];

const overall = Math.round(
  topics.reduce((sum, t) => sum + t.pct, 0) / topics.length,
);

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
};

const InterviewPrep = () => {
  const reduce = useReducedMotion();
  const t = (v: any) => (reduce ? {} : v);

  return (
    <section
      id="interview-prep"
      className="relative w-full overflow-hidden bg-[#070707] px-4 py-24 sm:px-8"
    >
      {/* Ambient pulse glow */}
      <motion.div
        animate={t({ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] })}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-blue-600 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Copy */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-white/60 backdrop-blur-md"
          >
            <FiBookOpen className="h-3.5 w-3.5 text-blue-500" />
            <span>
              <span className="text-blue-500">//</span> interview preparation
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-6 text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl"
          >
            Walk into interviews{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              prepared
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Plan what to study, track what you have finished, and let AI tell
            you what a job actually asks for.
          </motion.p>

          <motion.ul
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-10 space-y-5"
          >
            {features.map((f) => (
              <motion.li
                key={f.title}
                variants={fadeUp}
                whileHover={t({ x: 4 })}
                className="group flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-blue-500 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-blue-500/15 group-hover:text-blue-400">
                  {f.icon}
                </div>
                <div>
                  <p className="text-base font-medium text-white transition-colors duration-300 group-hover:text-blue-200">
                    {f.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-white/50">
                    {f.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Mockup */}
        <motion.div
          initial={t({ opacity: 0, y: 40, scale: 0.96 })}
          whileInView={t({ opacity: 1, y: 0, scale: 1 })}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="relative mx-auto w-full max-w-[560px]"
        >
          <div className="absolute -inset-4 rounded-[48px] bg-blue-600/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[44px] border-2 border-white/10 bg-white/[0.02] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-500/10 to-transparent" />
            <div className="pointer-events-none absolute -left-20 top-1/3 h-56 w-40 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-px top-[35%] h-[30%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

            <div className="relative space-y-4">
              {/* Plan header */}
              <div>
                <p className="font-mono text-xs text-white/40">
                  preparation plan
                </p>
                <h3 className="mt-1 text-xl font-medium tracking-tight text-white">
                  Backend Engineer · 6 weeks
                </h3>
                <div className="mt-4">
                  <div className="mb-2 flex justify-between font-mono text-xs">
                    <span className="text-white/50">overall</span>
                    <span className="text-blue-400">{overall}%</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      initial={t({ width: 0 })}
                      whileInView={t({ width: `${overall}%` })}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease, delay: 0.4 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                    />
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="space-y-3 rounded-3xl border border-white/5 bg-black/50 p-5 shadow-[inset_-1px_0_0_rgba(59,130,246,0.35)]">
                {topics.map((topic, i) => (
                  <motion.div
                    key={topic.name}
                    initial={t({ opacity: 0, x: -8 })}
                    whileInView={t({ opacity: 1, x: 0 })}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease, delay: 0.5 + i * 0.1 }}
                  >
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5 text-white/70">
                        {topic.pct === 100 && (
                          <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                        {topic.name}
                      </span>
                      <span className="font-mono text-white/40">{topic.pct}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={t({ width: 0 })}
                        whileInView={t({ width: `${topic.pct}%` })}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease, delay: 0.6 + i * 0.1 }}
                        className={`h-full rounded-full ${
                          topic.pct === 100
                            ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.4)]"
                            : "bg-gradient-to-r from-blue-600 to-sky-400"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* AI analysis */}
              <motion.div
                initial={t({ opacity: 0, y: 10 })}
                whileInView={t({ opacity: 1, y: 0 })}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: 1 }}
                className="rounded-3xl border border-blue-500/25 bg-blue-500/[0.06] p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                    <motion.div
                      animate={t({ rotate: [0, 10, -10, 0] })}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                    >
                      <FiCpu className="h-4 w-4 text-blue-400" />
                    </motion.div>
                    Job description analysis
                  </span>
                  <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 font-mono text-[10px] text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    AI
                  </span>
                </div>

                <p className="font-mono text-[11px] uppercase tracking-wider text-white/30">
                  Skills found in the job post
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {detected.map((d, i) => (
                    <motion.span
                      key={d}
                      initial={t({ opacity: 0, scale: 0.9 })}
                      whileInView={t({ opacity: 1, scale: 1 })}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, ease, delay: 1.1 + i * 0.05 }}
                      whileHover={t({ y: -2 })}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70 backdrop-blur-sm transition-colors hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-200"
                    >
                      {d}
                    </motion.span>
                  ))}
                </div>

                <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-white/30">
                  Missing from your plan
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {gaps.map((g, i) => (
                    <motion.span
                      key={g}
                      initial={t({ opacity: 0, scale: 0.9 })}
                      whileInView={t({ opacity: 1, scale: 1 })}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, ease, delay: 1.3 + i * 0.05 }}
                      whileHover={t({ y: -2 })}
                      className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-xs text-amber-200 backdrop-blur-sm transition-colors hover:border-amber-400/50 hover:bg-amber-400/20"
                    >
                      <FiAlertCircle className="h-3.5 w-3.5" />
                      {g}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InterviewPrep;