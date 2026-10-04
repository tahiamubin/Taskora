"use client";

import { useState, type ReactNode } from "react";
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
  Easy: "bg-emerald-400/10 text-emerald-300",
  Medium: "bg-amber-400/10 text-amber-300",
  Hard: "bg-rose-400/10 text-rose-300",
};

const filters: Filter[] = ["All", "Solved", "Attempted"];

const codeLines: string[] = [
  "const tails: number[] = [];",
  "for (const x of nums) {",
  "  const i = lowerBound(tails, x);",
  "  tails[i] = x;",
  "}",
];

const ProblemTracking = () => {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = problems.filter((p) => filter === "All" || p.status === filter);

  return (
    <section
      id="problem-tracking"
      className="relative w-full overflow-hidden bg-[#070707] px-4 py-24 sm:px-8"
    >
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[480px] w-[480px] rounded-full bg-blue-600/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Mockup */}
        <div className="relative mx-auto w-full max-w-[580px]">
          <div className="absolute -inset-4 rounded-[48px] bg-blue-600/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[44px] border-2 border-white/10 bg-[#111111] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-400/15 to-transparent" />
            <div className="pointer-events-none absolute -left-20 top-1/3 h-56 w-40 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-px top-[35%] h-[30%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

            <div className="relative space-y-4">
              {/* Header + filter */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-medium tracking-tight text-white">
                  My problems
                </h3>
                <div className="flex rounded-full border border-white/5 bg-black/60 p-1">
                  {filters.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={`h-8 rounded-full px-4 text-xs font-medium transition-all duration-300 ${
                        filter === f
                          ? "bg-white/[0.12] text-white shadow-[inset_-1px_0_0_rgba(59,130,246,0.6)]"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* List */}
              <ul className="space-y-2">
                {visible.map((p) => (
                  <li
                    key={p.title}
                    className="rounded-2xl border border-white/5 bg-black/50 px-4 py-3"
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
                            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${difficultyStyles[p.difficulty]}`}
                          >
                            {p.difficulty}
                          </span>
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[11px] text-white/30"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span
                        className={`inline-flex shrink-0 items-center gap-1 text-xs ${
                          p.status === "Solved"
                            ? "text-emerald-400"
                            : "text-amber-300"
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
                  </li>
                ))}
              </ul>

              {/* Detail: notes + code + files */}
              <div className="rounded-3xl border border-white/5 bg-black/50 p-5 shadow-[inset_-1px_0_0_rgba(59,130,246,0.35)]">
                <p className="text-sm font-medium text-white">
                  Longest Increasing Subsequence
                </p>

                <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-white/30">
                  Solution notes
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/60">
                  Patience sorting with binary search, O(n log n). The tails
                  array holds the smallest tail for each length.
                </p>

                <div className="mt-3 rounded-2xl border border-white/5 bg-[#0a0a0a] p-3 font-mono text-xs leading-6 text-white/60">
                  {codeLines.map((line, i) => (
                    <div key={i} className="whitespace-pre">
                      {line}
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/60">
                    <FiFileText className="h-3.5 w-3.5 text-blue-500" />
                    dp-notes.pdf
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/60">
                    <FiImage className="h-3.5 w-3.5 text-blue-500" />
                    tails-diagram.png
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-white/15 px-3 py-1.5 text-xs text-white/40">
                    <FiUploadCloud className="h-3.5 w-3.5" />
                    Upload file
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-white/60">
            <FiTarget className="h-3.5 w-3.5 text-blue-500" />
            <span>
              <span className="text-blue-500">//</span> problem tracking
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Every problem,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              one place
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Stop losing solutions in scattered tabs and notebooks. Keep your
            problems, notes and code together and easy to revise.
          </p>

          <ul className="mt-10 space-y-5">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-blue-500">
                  {f.icon}
                </div>
                <div>
                  <p className="text-base font-medium text-white">{f.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-white/50">
                    {f.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProblemTracking;