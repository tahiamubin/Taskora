import type { ReactNode } from "react";
import {
  FiArrowUp,
  FiCheckCircle,
  FiCode,
  FiHelpCircle,
  FiMessageSquare,
  FiUsers,
} from "react-icons/fi";

const features: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <FiHelpCircle className="h-5 w-5" />,
    title: "Ask coding questions",
    desc: "Stuck on a bug or a problem? Post it and get unstuck faster.",
  },
  {
    icon: <FiCode className="h-5 w-5" />,
    title: "Share what you tried",
    desc: "Add your code and approach so helpers can spot the real issue.",
  },
  {
    icon: <FiUsers className="h-5 w-5" />,
    title: "Get answers from other students",
    desc: "Learn from classmates who solved the same problem last week.",
  },
  {
    icon: <FiCheckCircle className="h-5 w-5" />,
    title: "Accept an answer when solved",
    desc: "Mark the answer that worked so others can find it later.",
  },
];

const codeLines: string[] = [
  "void dfs(int u, int p) {",
  "  for (int v : adj[u])",
  "    if (v != p) dfs(v, u);",
  "}",
];

const CommunityHelpBoard = () => {
  return (
    <section
      id="help-board"
      className="relative w-full overflow-hidden bg-[#070707] px-4 py-24 sm:px-8"
    >
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[480px] w-[480px] rounded-full bg-blue-600/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Mockup (left on desktop) */}
        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute -inset-4 rounded-[48px] bg-blue-600/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[44px] border-2 border-white/10 bg-[#111111] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-400/15 to-transparent" />
            <div className="pointer-events-none absolute -left-20 top-1/3 h-56 w-40 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-px top-[35%] h-[30%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium tracking-tight text-white">
                  Help Board
                </h3>
                <span className="rounded-full bg-white/[0.08] px-4 py-2 text-xs font-medium text-white">
                  Ask a question
                </span>
              </div>

              {/* Question */}
              <div className="rounded-3xl border border-white/5 bg-black/50 p-5 shadow-[inset_-1px_0_0_rgba(59,130,246,0.35)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-xs font-semibold text-blue-300">
                    M
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/80">Mei L.</p>
                    <p className="font-mono text-[11px] text-white/30">
                      asked 2h ago
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm font-medium text-white">
                  Why does my DFS get TLE on a 10^5 node tree?
                </p>

                <div className="mt-2 flex gap-2">
                  {["graphs", "c++", "recursion"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-white/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-white/30">
                  What I tried
                </p>
                <div className="mt-2 rounded-2xl border border-white/5 bg-[#0a0a0a] p-3 font-mono text-xs leading-6 text-white/60">
                  {codeLines.map((line, i) => (
                    <div key={i} className="whitespace-pre">
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* Accepted answer */}
              <div className="rounded-3xl border border-emerald-400/25 bg-emerald-400/[0.06] p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-medium text-emerald-300">
                    <FiCheckCircle className="h-3.5 w-3.5" />
                    Accepted answer
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-xs text-white/50">
                    <FiArrowUp className="h-3.5 w-3.5" /> 14
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white/70">
                  Deep recursion is the bottleneck. Switch to an iterative DFS
                  with an explicit stack and add fast I/O.
                </p>
                <p className="mt-2 font-mono text-[11px] text-white/30">
                  Daniel O. · Gold
                </p>
              </div>

              {/* Other answer */}
              <div className="rounded-3xl border border-white/5 bg-black/50 p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/40">
                    <FiMessageSquare className="h-3.5 w-3.5" />
                    2 more answers
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-xs text-white/40">
                    <FiArrowUp className="h-3.5 w-3.5" /> 3
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-white/50">
                  Also check that you are not copying the adjacency list on
                  every call.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-white/60">
            <FiMessageSquare className="h-3.5 w-3.5 text-blue-500" />
            <span>
              <span className="text-blue-500">//</span> community help board
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Never debug{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              alone
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            A help board built for students. Ask, answer and learn together.
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

export default CommunityHelpBoard;