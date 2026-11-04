"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FiCheckCircle,
  FiCheckSquare,
  FiClock,
  FiEdit3,
  FiFileText,
  FiImage,
  FiTag,
  FiTarget,
  FiUploadCloud,
} from "react-icons/fi";

type Status = "Solved" | "Attempted";
type Difficulty = "Easy" | "Medium" | "Hard";
type Filter = "All" | Status;

type Problem = {
  title: string;
  platform: string;
  difficulty: Difficulty;
  tags: string[];
  status: Status;
};

const features: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <FiCheckSquare className="h-5 w-5" />,
    title: "Track solved and attempted problems",
    desc: "Keep a clean record of what you cracked and what still needs work.",
  },
  {
    icon: <FiTag className="h-5 w-5" />,
    title: "Platform, difficulty and tags",
    desc: "Log problems from any platform and filter them by topic later.",
  },
  {
    icon: <FiEdit3 className="h-5 w-5" />,
    title: "Add solution notes and code",
    desc: "Write down the idea and keep your code next to it for revision.",
  },
  {
    icon: <FiUploadCloud className="h-5 w-5" />,
    title: "Upload supporting files",
    desc: "Attach diagrams, PDFs and screenshots to any problem.",
  },
];

const problems: Problem[] = [
  { title: "Two Sum", platform: "LeetCode", difficulty: "Easy", tags: ["array", "hash-map"], status: "Solved" },
  { title: "Longest Increasing Subsequence", platform: "LeetCode", difficulty: "Medium", tags: ["dp", "binary-search"], status: "Solved" },
  { title: "Theatre Square", platform: "Codeforces", difficulty: "Easy", tags: ["math"], status: "Solved" },
  { title: "Word Ladder", platform: "LeetCode", difficulty: "Hard", tags: ["graph", "bfs"], status: "Attempted" },
  { title: "Minimum Window Substring", platform: "HackerRank", difficulty: "Hard", tags: ["sliding-window"], status: "Attempted" },
];

const difficultyStyles: Record<Difficulty, string> = {
  Easy: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
  Medium: "bg-amber-400/10 text-amber-300 border-amber-400/20",
  Hard: "bg-rose-400/10 text-rose-300 border-rose-400/20",
};

const filters: Filter[] = ["All", "Solved", "Attempted"];

const codeLines: string[] = [
  "const tails: number[] = [];",
  "for (const x of nums) {",
  "  const i = lowerBound(tails, x);",
  "  tails[i] = x;",
  "}",
];

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
};

const ProblemTracking = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = problems.filter((p) => filter === "All" || p.status === filter);
  
  const reduce = useReducedMotion();
  const t = (v: any) => (reduce ? {} : v);

  return (
    <section
      id="problem-tracking"
      className="relative w-full overflow-hidden bg-[#070707] px-4 py-24 sm:px-8"
    >
      {/* Ambient glows */}
      <motion.div
        animate={t({ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] })}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-40 top-1/4 h-[480px] w-[480px] rounded-full bg-blue-600 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        
        {/* Mockup */}
        <motion.div
          initial={t({ opacity: 0, y: 40, scale: 0.96 })}
          whileInView={t({ opacity: 1, y: 0, scale: 1 })}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="relative mx-auto w-full max-w-[580px]"
        >
          <div className="absolute -inset-4 rounded-[48px] bg-blue-600/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[44px] border-2 border-white/10 bg-white/[0.02] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-500/10 to-transparent" />
            <div className="pointer-events-none absolute -left-20 top-1/3 h-56 w-40 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-px top-[35%] h-[30%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

            <div className="relative space-y-4">
              {/* Header + filter */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-medium tracking-tight text-white">
                  My problems
                </h3>
                <div className="flex rounded-full border border-white/5 bg-black/60 p-1 backdrop-blur-md">
                  {filters.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={`relative h-8 rounded-full px-4 text-xs font-medium transition-colors duration-300 ${
                        filter === f ? "text-white" : "text-white/50 hover:text-white"
                      }`}
                    >
                      {filter === f && (
                        <motion.span
                          layoutId="active-filter"
                          className="absolute inset-0 rounded-full bg-white/[0.12] shadow-[inset_-1px_0_0_rgba(59,130,246,0.6)]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{f}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* List */}
              <ul className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {visible.map((p) => (
                    <motion.li
                      key={p.title}
                      layout
                      initial={t({ opacity: 0, x: -10 })}
                      animate={t({ opacity: 1, x: 0 })}
                      exit={t({ opacity: 0, scale: 0.95 })}
                      transition={{ duration: 0.3, ease }}
                      whileHover={t({ x: 3 })}
                      className="rounded-2xl border border-white/5 bg-black/40 px-4 py-3 backdrop-blur-sm transition-colors hover:border-white/10 hover:bg-black/60"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {p.title}
                          </p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-white/50">
                              {p.platform}
                            </span>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${difficultyStyles[p.difficulty]}`}
                            >
                              {p.difficulty}
                            </span>
                            {p.tags.map((tag) => (
                              <span key={tag} className="font-mono text-[11px] text-white/30">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span
                          className={`inline-flex shrink-0 items-center gap-1 text-xs ${
                            p.status === "Solved" ? "text-emerald-400" : "text-amber-300"
                          }`}
                        >
                          {p.status === "Solved" ? (
                            <FiCheckCircle className="h-3.5 w-3.5" />
                          ) : (
                            <FiClock className="h-3.5 w-3.5" />
                          )}
                          {p.status}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              {/* Detail Card */}
              <motion.div
                initial={t({ opacity: 0, y: 10 })}
                animate={t({ opacity: 1, y: 0 })}
                transition={{ duration: 0.5, ease, delay: 0.4 }}
                className="rounded-3xl border border-white/5 bg-black/50 p-5 shadow-[inset_-1px_0_0_rgba(59,130,246,0.35)]"
              >
                <p className="text-sm font-medium text-white">
                  Longest Increasing Subsequence
                </p>

                <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-blue-400/70">
                  // solution notes
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  Patience sorting with binary search, O(n log n). The tails
                  array holds the smallest tail for each length.
                </p>

                <div className="mt-3 overflow-x-auto rounded-2xl border border-white/5 bg-[#0a0a0a] p-3 font-mono text-xs leading-6 text-white/60">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={t({ opacity: 0, x: -4 })}
                      animate={t({ opacity: 1, x: 0 })}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
                      className="whitespace-pre"
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <motion.span
                    whileHover={t({ y: -2 })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/60 backdrop-blur-sm transition-colors hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-300"
                  >
                    <FiFileText className="h-3.5 w-3.5 text-blue-500" />
                    dp-notes.pdf
                  </motion.span>
                  <motion.span
                    whileHover={t({ y: -2 })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/60 backdrop-blur-sm transition-colors hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-300"
                  >
                    <FiImage className="h-3.5 w-3.5 text-blue-500" />
                    tails-diagram.png
                  </motion.span>
                  <motion.button
                    whileHover={t({ y: -2, scale: 1.02 })}
                    whileTap={t({ scale: 0.97 })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/15 px-3 py-1.5 text-xs text-white/40 transition-colors hover:border-blue-500/40 hover:text-blue-400"
                  >
                    <FiUploadCloud className="h-3.5 w-3.5" />
                    Upload file
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

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
            <FiTarget className="h-3.5 w-3.5 text-blue-500" />
            <span>
              <span className="text-blue-500">//</span> problem tracking
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="mt-6 text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl"
          >
            Every problem,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              one place
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Stop losing solutions in scattered tabs and notebooks. Keep your
            problems, notes and code together and easy to revise.
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
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-blue-500 transition-colors duration-300 group-hover:border-blue-500/40 group-hover:bg-blue-500/15 group-hover:text-blue-400">
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
      </div>
    </section>
  );
};

export default ProblemTracking;