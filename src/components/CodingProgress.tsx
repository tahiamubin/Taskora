import type { ReactNode } from "react";
import { FaFire, FaMedal, FaTrophy } from "react-icons/fa";
import {
  FiActivity,
  FiAward,
  FiCheckCircle,
  FiCode,
  FiStar,
  FiZap,
} from "react-icons/fi";

/* ----------------------------- Mock data ----------------------------- */

const solved = [
  { label: "Easy", value: 182, color: "#34d399", bar: "bg-emerald-400" },
  { label: "Medium", value: 176, color: "#fbbf24", bar: "bg-amber-400" },
  { label: "Hard", value: 70, color: "#fb7185", bar: "bg-rose-400" },
];
const totalSolved = solved.reduce((sum, s) => sum + s.value, 0);

const ratingHistory: number[] = [1420, 1465, 1440, 1520, 1580, 1555, 1640, 1712];

const contests = [
  { name: "Weekly Contest 412", rank: "#238", change: 42 },
  { name: "Biweekly Contest 138", rank: "#611", change: -18 },
  { name: "Weekly Contest 411", rank: "#154", change: 57 },
];

const badges: { icon: ReactNode; label: string; unlocked: boolean }[] = [
  { icon: <FaFire className="h-4 w-4" />, label: "21-day streak", unlocked: true },
  { icon: <FaTrophy className="h-4 w-4" />, label: "Top 5% contest", unlocked: true },
  { icon: <FaMedal className="h-4 w-4" />, label: "400 solved", unlocked: true },
  { icon: <FiStar className="h-4 w-4" />, label: "500 solved", unlocked: false },
];

// Deterministic heatmap (no Math.random → no hydration mismatch)
const WEEKS = 26;
const heatmap: number[] = Array.from({ length: WEEKS * 7 }, (_, i) => {
  const v = (i * 7 + (i >> 2) * 3 + (i % 5) + (i >> 4)) % 12;
  return v < 3 ? 0 : v < 6 ? 1 : v < 8 ? 2 : v < 10 ? 3 : 4;
});
const heatColors = [
  "bg-white/[0.05]",
  "bg-blue-500/20",
  "bg-blue-500/40",
  "bg-blue-500/65",
  "bg-blue-400",
];
const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];

/* ------------------------------ Helpers ------------------------------ */

const buildRatingChart = (values: number[], w = 300, h = 100, pad = 8) => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
    return [x, y] as const;
  });
  const line = pts.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `${pad},${h} ${line} ${w - pad},${h}`;
  const last = pts[pts.length - 1];
  return { line, area, last };
};

const rating = buildRatingChart(ratingHistory);

type CardProps = {
  title: string;
  icon: ReactNode;
  className?: string;
  children: ReactNode;
};

const Card = ({ title, icon, className = "", children }: CardProps) => (
  <div
    className={`relative overflow-hidden rounded-[36px] border-2 border-white/10 bg-[#111111] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.5)] ${className}`}
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-400/10 to-transparent" />
    <div className="pointer-events-none absolute -left-16 top-1/3 h-40 w-32 rounded-full bg-blue-600/20 blur-3xl" />
    <div className="pointer-events-none absolute -left-px top-[35%] h-[30%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

    <div className="relative">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-blue-500">
          {icon}
        </div>
        <h3 className="text-lg font-medium tracking-tight text-white">
          {title}
        </h3>
      </div>
      {children}
    </div>
  </div>
);

/* ----------------------------- Component ----------------------------- */

const CodingProgress = () => {
  // Donut segments
  const r = 52;
  const C = 2 * Math.PI * r;
  const gap = 6;
  let offset = 0;
  const segments = solved.map((s) => {
    const len = (s.value / totalSolved) * C - gap;
    const seg = { ...s, len, offset };
    offset += (s.value / totalSolved) * C;
    return seg;
  });

  return (
    <section
      id="features"
      className="relative w-full overflow-hidden bg-[#070707] px-4 py-24 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-white/60">
            <FiCode className="h-3.5 w-3.5 text-blue-500" />
            <span>
              <span className="text-blue-500">//</span> coding progress
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-medium tracking-tight text-white sm:text-5xl">
            See every step of your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              growth
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
            Problems, contests, points and streaks, all tracked automatically
            so you always know where you stand.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {/* Solved problems */}
          <Card
            title="Solved problems"
            icon={<FiCheckCircle className="h-4 w-4" />}
          >
            <div className="flex items-center gap-6">
              <div className="relative h-32 w-32 shrink-0">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r={r}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="10"
                  />
                  {segments.map((s) => (
                    <circle
                      key={s.label}
                      cx="60"
                      cy="60"
                      r={r}
                      fill="none"
                      stroke={s.color}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${s.len} ${C - s.len}`}
                      strokeDashoffset={-s.offset}
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-semibold text-white">
                    {totalSolved}
                  </span>
                  <span className="font-mono text-[11px] text-white/40">
                    solved
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                {solved.map((s) => (
                  <div key={s.label}>
                    <div className="mb-1 flex justify-between font-mono text-xs">
                      <span className="text-white/60">{s.label}</span>
                      <span className="text-white/40">{s.value}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={`h-full rounded-full ${s.bar}`}
                        style={{ width: `${(s.value / totalSolved) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-6 rounded-2xl border border-white/5 bg-black/50 px-4 py-3 text-xs text-white/50">
              <span className="font-mono text-blue-500">+12</span> problems
              solved this week
            </p>
          </Card>

          {/* Contest participation */}
          <Card
            title="Contest participation"
            icon={<FiAward className="h-4 w-4" />}
            className="lg:col-span-2"
          >
            <div className="grid gap-6 md:grid-cols-5">
              <div className="md:col-span-3">
                <div className="mb-2 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-white">1712</p>
                    <p className="font-mono text-xs text-white/40">
                      current rating
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-400">
                    +292 in 8 contests
                  </span>
                </div>
                <svg viewBox="0 0 300 100" className="h-28 w-full">
                  <defs>
                    <linearGradient id="ratingFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon points={rating.area} fill="url(#ratingFill)" />
                  <polyline
                    points={rating.line}
                    fill="none"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  <circle
                    cx={rating.last[0]}
                    cy={rating.last[1]}
                    r="4"
                    fill="#3b82f6"
                  />
                </svg>
              </div>

              <ul className="space-y-2 md:col-span-2">
                {contests.map((c) => (
                  <li
                    key={c.name}
                    className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/50 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm text-white/80">{c.name}</p>
                      <p className="font-mono text-xs text-white/40">
                        rank {c.rank}
                      </p>
                    </div>
                    <span
                      className={`font-mono text-sm ${
                        c.change > 0 ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {c.change > 0 ? "+" : ""}
                      {c.change}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Points and levels */}
          <Card title="Points & levels" icon={<FiZap className="h-4 w-4" />}>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/10 text-2xl font-semibold text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                12
              </div>
              <div>
                <p className="text-base font-medium text-white">
                  Algorithm Adept
                </p>
                <p className="font-mono text-xs text-white/40">
                  3,420 / 4,000 XP
                </p>
              </div>
            </div>

            <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
                style={{ width: `${(3420 / 4000) * 100}%` }}
              />
            </div>
            <p className="mt-2 font-mono text-xs text-white/40">
              580 XP to level 13
            </p>

            <div className="mt-6 grid grid-cols-2 gap-2">
              {badges.map((b) => (
                <div
                  key={b.label}
                  className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs ${
                    b.unlocked
                      ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
                      : "border-white/5 bg-black/50 text-white/30"
                  }`}
                >
                  {b.icon}
                  {b.label}
                </div>
              ))}
            </div>
          </Card>

          {/* Streaks and heatmap */}
          <Card
            title="Streaks & heatmap"
            icon={<FiActivity className="h-4 w-4" />}
            className="lg:col-span-2"
          >
            <div className="mb-5 grid grid-cols-3 gap-3">
              {[
                { label: "Current streak", value: "21 days", icon: <FaFire className="h-3.5 w-3.5" /> },
                { label: "Longest streak", value: "47 days", icon: <FaTrophy className="h-3.5 w-3.5" /> },
                { label: "Active days", value: "164", icon: <FiActivity className="h-3.5 w-3.5" /> },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/5 bg-black/50 p-3 shadow-[inset_-1px_0_0_rgba(59,130,246,0.35)]"
                >
                  <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                    <span className="text-blue-500">{s.icon}</span>
                    {s.label}
                  </div>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/5 bg-black/50 p-4">
              <div className="min-w-[460px]">
                <div className="mb-2 flex justify-between font-mono text-[11px] text-white/30">
                  {months.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
                <div className="grid grid-flow-col grid-rows-7 gap-1">
                  {heatmap.map((level, i) => (
                    <span
                      key={i}
                      className={`aspect-square rounded-[3px] ${heatColors[level]}`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[11px] text-white/30">
                  Less
                  {heatColors.map((c) => (
                    <span key={c} className={`h-3 w-3 rounded-[3px] ${c}`} />
                  ))}
                  More
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CodingProgress;