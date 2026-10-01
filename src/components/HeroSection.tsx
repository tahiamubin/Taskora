import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiTerminal, FiTrendingUp, FiZap } from "react-icons/fi";
import { FaCode, FaFire } from "react-icons/fa";

type Stat = {
  label: string;
  value: string;
  hint: string;
  icon: React.ReactNode;
};

const stats: Stat[] = [
  {
    label: "Solved",
    value: "428",
    hint: "+12 this week",
    icon: <FiCheckCircle className="h-4 w-4" />,
  },
  {
    label: "Streak",
    value: "21d",
    hint: "Personal best",
    icon: <FaFire className="h-4 w-4" />,
  },
  {
    label: "Rank",
    value: "#142",
    hint: "Top 4%",
    icon: <FiTrendingUp className="h-4 w-4" />,
  },
];

const languages: { name: string; pct: number }[] = [
  { name: "TypeScript", pct: 72 },
  { name: "C++", pct: 54 },
  { name: "Python", pct: 38 },
];

// Deterministic heatmap (no Math.random, so no hydration mismatch)
const heatmap: number[] = Array.from({ length: 18 * 7 }, (_, i) => {
  const v = (i * 7 + (i >> 2) * 3 + (i % 5)) % 11;
  return v < 3 ? 0 : v < 5 ? 1 : v < 7 ? 2 : v < 9 ? 3 : 4;
});

const heatColors = [
  "bg-white/[0.05]",
  "bg-blue-500/20",
  "bg-blue-500/40",
  "bg-blue-500/65",
  "bg-blue-400",
];

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-[#070707] px-4 pb-24 pt-20 sm:px-8 lg:pt-28"
    >
      {/* Background: grid + glows */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -left-40 top-24 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-white/60">
            <FiTerminal className="h-3.5 w-3.5 text-blue-500" />
            <span>
              <span className="text-blue-500">$</span> codetrail --track --grow
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Track Your Coding Journey.{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              Build Your Career.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg lg:mx-0">
            Log problems, projects and daily streaks in one place. See your
            progress, spot your weak topics, and show recruiters real proof of
            how far you have come.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/signup"
              className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] active:scale-95 sm:w-auto"
            >
              Get Started
              <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="#features"
              className="inline-flex h-14 w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-8 text-base font-medium text-white/80 transition-all duration-300 hover:bg-white/[0.1] hover:text-white sm:w-auto"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-white/40 lg:justify-start">
            <span>// free to start</span>
            <span>// no credit card</span>
            <span>// built for CSE students</span>
          </div>
        </div>

        {/* Right: dashboard mockup */}
        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute -inset-4 rounded-[48px] bg-blue-600/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[36px] border-2 border-white/10 bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-400/15 to-transparent" />
            <div className="pointer-events-none absolute -left-20 top-1/3 h-56 w-40 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-px top-[35%] h-[30%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

            {/* Window chrome */}
            <div className="relative flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                <span className="h-3 w-3 rounded-full bg-green-400/70" />
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-white/40">
                <FaCode className="h-3 w-3" />
                dashboard.tsx
              </div>
              <FiZap className="h-4 w-4 text-blue-500" />
            </div>

            <div className="relative space-y-4 p-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-3xl border border-white/5 bg-black/50 p-4 shadow-[inset_-1px_0_0_rgba(59,130,246,0.35)]"
                  >
                    <div className="flex items-center gap-2 text-xs text-white/40">
                      <span className="text-blue-500">{s.icon}</span>
                      {s.label}
                    </div>
                    <p className="mt-2 text-2xl font-semibold text-white">
                      {s.value}
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/40">{s.hint}</p>
                  </div>
                ))}
              </div>

              {/* Heatmap */}
              <div className="rounded-3xl border border-white/5 bg-black/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium text-white/60">
                    Activity
                  </p>
                  <p className="font-mono text-[11px] text-white/30">
                    last 18 weeks
                  </p>
                </div>
                <div className="grid grid-flow-col grid-rows-7 gap-1">
                  {heatmap.map((level, i) => (
                    <span
                      key={i}
                      className={`aspect-square rounded-[3px] ${heatColors[level]}`}
                    />
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="rounded-3xl border border-white/5 bg-black/50 p-4">
                <p className="mb-3 text-xs font-medium text-white/60">
                  Languages
                </p>
                <div className="space-y-3">
                  {languages.map((l) => (
                    <div key={l.name} className="flex items-center gap-3">
                      <span className="w-20 font-mono text-xs text-white/50">
                        {l.name}
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
                          style={{ width: `${l.pct}%` }}
                        />
                      </div>
                      <span className="w-9 text-right font-mono text-xs text-white/40">
                        {l.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating terminal card */}
          <div className="absolute -bottom-8 -left-6 hidden w-64 rounded-3xl border border-white/10 bg-[#0c0c0c]/95 p-4 font-mono text-xs leading-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:block">
            <p className="text-white/40">
              <span className="text-blue-500">$</span> codetrail sync
            </p>
            <p className="text-green-400/90">✔ 3 problems solved</p>
            <p className="text-green-400/90">✔ streak: 21 days</p>
            <p className="text-white/40">
              <span className="text-blue-500">$</span>
              <span className="ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-white/70" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;