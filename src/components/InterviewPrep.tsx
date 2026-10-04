import type { ReactNode } from "react";
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

const InterviewPrep = () => {
  return (
    <section
      id="interview-prep"
      className="relative w-full overflow-hidden bg-[#070707] px-4 py-24 sm:px-8"
    >
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-blue-600/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-white/60">
            <FiBookOpen className="h-3.5 w-3.5 text-blue-500" />
            <span>
              <span className="text-blue-500">//</span> interview preparation
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Walk into interviews{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              prepared
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Plan what to study, track what you have finished, and let AI tell
            you what a job actually asks for.
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

        {/* Mockup */}
        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute -inset-4 rounded-[48px] bg-blue-600/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[44px] border-2 border-white/10 bg-[#111111] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-400/15 to-transparent" />
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
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
                      style={{ width: `${overall}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="space-y-3 rounded-3xl border border-white/5 bg-black/50 p-5 shadow-[inset_-1px_0_0_rgba(59,130,246,0.35)]">
                {topics.map((t) => (
                  <div key={t.name}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1.5 text-white/70">
                        {t.pct === 100 && (
                          <FiCheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                        {t.name}
                      </span>
                      <span className="font-mono text-white/40">{t.pct}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={`h-full rounded-full ${
                          t.pct === 100
                            ? "bg-emerald-400"
                            : "bg-gradient-to-r from-blue-600 to-sky-400"
                        }`}
                        style={{ width: `${t.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* AI analysis */}
              <div className="rounded-3xl border border-blue-500/25 bg-blue-500/[0.06] p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
                    <FiCpu className="h-4 w-4 text-blue-400" />
                    Job description analysis
                  </span>
                  <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 font-mono text-[10px] text-blue-300">
                    AI
                  </span>
                </div>

                <p className="font-mono text-[11px] uppercase tracking-wider text-white/30">
                  Skills found in the job post
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {detected.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-white/30">
                  Missing from your plan
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {gaps.map((g) => (
                    <span
                      key={g}
                      className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-xs text-amber-200"
                    >
                      <FiAlertCircle className="h-3.5 w-3.5" />
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterviewPrep;