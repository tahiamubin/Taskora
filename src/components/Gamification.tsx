import { FaGem, FaMedal } from "react-icons/fa";
import { FiAward } from "react-icons/fi";

type Level = {
  name: string;
  min: number;
  gradient: string;
  text: string;
  glow: string;
  diamond?: boolean;
};

const levels: Level[] = [
  { name: "Bronze", min: 0, gradient: "from-amber-700 to-orange-400", text: "text-orange-300", glow: "rgba(251,146,60,0.35)" },
  { name: "Silver", min: 200, gradient: "from-slate-400 to-slate-200", text: "text-slate-200", glow: "rgba(203,213,225,0.3)" },
  { name: "Gold", min: 600, gradient: "from-yellow-500 to-amber-300", text: "text-yellow-300", glow: "rgba(250,204,21,0.35)" },
  { name: "Platinum", min: 1500, gradient: "from-cyan-400 to-sky-200", text: "text-cyan-200", glow: "rgba(103,232,249,0.35)" },
  { name: "Diamond", min: 3000, gradient: "from-blue-500 to-violet-400", text: "text-blue-300", glow: "rgba(96,165,250,0.45)", diamond: true },
];

const earn: { label: string; pts: string }[] = [
  { label: "Solve a problem", pts: "+1 to +5" },
  { label: "Join a contest", pts: "+5" },
  { label: "Monthly goal done", pts: "+10" },
  { label: "Accepted answer", pts: "+5" },
];

const userPoints = 2340;
const currentIndex = levels.reduce(
  (idx, l, i) => (userPoints >= l.min ? i : idx),
  0,
);
const next = levels[currentIndex + 1];
const progress = next
  ? ((userPoints - levels[currentIndex].min) /
      (next.min - levels[currentIndex].min)) *
    100
  : 100;

const Gamification = () => {
  return (
    <section
      id="levels"
      className="relative w-full overflow-hidden bg-[#070707] px-4 py-24 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-white/60">
            <FiAward className="h-3.5 w-3.5 text-blue-500" />
            <span>
              <span className="text-blue-500">//</span> gamification
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Level up as you{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              code
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
            Every point moves you up the ladder, from Bronze all the way to
            Diamond.
          </p>
        </div>

        {/* Level ladder */}
        <div className="relative mt-16 overflow-hidden rounded-[44px] border-2 border-white/10 bg-[#111111] px-6 py-12 shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:px-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-400/10 to-transparent" />
          <div className="pointer-events-none absolute -left-20 top-1/3 h-56 w-40 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-px top-[35%] h-[30%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[10%] right-[10%] top-9 hidden h-px bg-gradient-to-r from-orange-400/50 via-yellow-300/50 to-blue-400/60 sm:block" />

            <div className="grid gap-8 sm:grid-cols-5 sm:gap-4">
              {levels.map((l, i) => {
                const reached = i <= currentIndex;
                const isCurrent = i === currentIndex;
                const Icon = l.diamond ? FaGem : FaMedal;
                return (
                  <div
                    key={l.name}
                    className="relative flex flex-col items-center text-center"
                  >
                    {isCurrent && (
                      <span className="absolute -top-6 rounded-full bg-blue-500 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-white">
                        you are here
                      </span>
                    )}
                    <div
                      className={`relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gradient-to-br ${l.gradient} transition-all duration-300 ${
                        reached ? "opacity-100" : "opacity-30 grayscale"
                      } ${isCurrent ? "scale-110 ring-4 ring-blue-500/40" : ""}`}
                      style={{
                        boxShadow: reached
                          ? `0 0 40px ${l.glow}`
                          : undefined,
                      }}
                    >
                      <Icon className="h-8 w-8 text-black/70" />
                    </div>
                    <p
                      className={`mt-4 text-base font-semibold ${
                        reached ? l.text : "text-white/30"
                      }`}
                    >
                      {l.name}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-white/40">
                      {l.min.toLocaleString("en-US")}+ pts
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Progress to next */}
            {next && (
              <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-white/5 bg-black/50 p-5 shadow-[inset_-1px_0_0_rgba(59,130,246,0.35)]">
                <div className="mb-2 flex justify-between font-mono text-xs">
                  <span className="text-white/60">
                    {levels[currentIndex].name} → {next.name}
                  </span>
                  <span className="text-white/40">
                    {userPoints.toLocaleString("en-US")} /{" "}
                    {next.min.toLocaleString("en-US")} pts
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* How to earn */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {earn.map((e) => (
                <span
                  key={e.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-4 py-2 text-xs text-white/60"
                >
                  {e.label}
                  <span className="font-mono text-blue-400">{e.pts}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gamification;