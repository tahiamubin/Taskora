import type { ReactNode } from "react";
import {
  FiAward,
  FiCheck,
  FiCheckCircle,
  FiCode,
  FiPlus,
  FiRefreshCw,
  FiTarget,
  FiBookOpen,
} from "react-icons/fi";

/* ----------------------------- Mock data ----------------------------- */

const features: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <FiTarget className="h-5 w-5" />,
    title: "Set monthly goals",
    desc: "Pick realistic targets at the start of each month and stay accountable.",
  },
  {
    icon: <FiCode className="h-5 w-5" />,
    title: "Problems",
    desc: "Set how many problems you want to solve, by topic or difficulty.",
  },
  {
    icon: <FiAward className="h-5 w-5" />,
    title: "Contests",
    desc: "Plan how many rated contests you will take part in this month.",
  },
  {
    icon: <FiBookOpen className="h-5 w-5" />,
    title: "Interview-prep topics",
    desc: "Queue up topics like DP, graphs and system design, then tick them off.",
  },
  {
    icon: <FiRefreshCw className="h-5 w-5" />,
    title: "Automatic progress tracking",
    desc: "Your submissions and contests update goals for you. No manual logging.",
  },
];

const problemGoal = { done: 32, target: 50, weekly: [9, 11, 8, 4] };
const contestGoal = { done: 3, target: 4 };

type TopicStatus = "done" | "progress" | "todo";
const topics: { name: string; status: TopicStatus }[] = [
  { name: "Arrays & Hashing", status: "done" },
  { name: "Two Pointers", status: "done" },
  { name: "Dynamic Programming", status: "progress" },
  { name: "Graphs", status: "progress" },
  { name: "Trees", status: "todo" },
  { name: "System Design", status: "todo" },
];

const topicStyles: Record<TopicStatus, string> = {
  done: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  progress: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  todo: "border-white/5 bg-black/50 text-white/40",
};

const topicsDone = topics.filter((t) => t.status === "done").length;
const overall = Math.round(
  ((problemGoal.done / problemGoal.target +
    contestGoal.done / contestGoal.target +
    topicsDone / topics.length) /
    3) *
    100,
);

/* ------------------------------ Helpers ------------------------------ */

type GoalRowProps = {
  icon: ReactNode;
  title: string;
  value: string;
  children: ReactNode;
};

const GoalRow = ({ icon, title, value, children }: GoalRowProps) => (
  <div className="rounded-3xl border border-white/5 bg-black/50 p-5 shadow-[inset_-1px_0_0_rgba(59,130,246,0.35)]">
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.08] text-blue-500">
          {icon}
        </div>
        <p className="text-sm font-medium text-white">{title}</p>
      </div>
      <span className="font-mono text-xs text-white/50">{value}</span>
    </div>
    {children}
  </div>
);

/* ----------------------------- Component ----------------------------- */

const Goals = () => {
  const maxWeekly = Math.max(...problemGoal.weekly);

  return (
    <section
      id="goals"
      className="relative w-full overflow-hidden bg-[#070707] px-4 py-24 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-blue-600/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs text-white/60">
            <FiTarget className="h-3.5 w-3.5 text-blue-500" />
            <span>
              <span className="text-blue-500">//</span> goals
            </span>
          </div>

          <h2 className="mt-6 text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Set the target.{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              We track the rest.
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Turn &quot;I should practice more&quot; into a plan you can
            measure. Set monthly goals and watch them fill up on their own.
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

        {/* Right: goals mockup */}
        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute -inset-4 rounded-[48px] bg-blue-600/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[44px] border-2 border-white/10 bg-[#111111] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-400/15 to-transparent" />
            <div className="pointer-events-none absolute -left-20 top-1/3 h-56 w-40 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="pointer-events-none absolute -left-px top-[35%] h-[30%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

            <div className="relative">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-medium tracking-tight text-white">
                    Monthly goals
                  </h3>
                  <p className="mt-1 font-mono text-xs text-white/40">
                    this month
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-white/60">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  auto-tracking on
                </span>
              </div>

              {/* Overall */}
              <div className="mt-6">
                <div className="mb-2 flex justify-between font-mono text-xs">
                  <span className="text-white/50">overall progress</span>
                  <span className="text-blue-400">{overall}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
                    style={{ width: `${overall}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {/* Problems */}
                <GoalRow
                  icon={<FiCode className="h-4 w-4" />}
                  title="Problems"
                  value={`${problemGoal.done} / ${problemGoal.target}`}
                >
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky-400"
                      style={{
                        width: `${(problemGoal.done / problemGoal.target) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="mt-4 flex h-12 items-end gap-2">
                    {problemGoal.weekly.map((w, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-1">
                        <div
                          className="w-full rounded-md bg-blue-500/40"
                          style={{ height: `${(w / maxWeekly) * 100}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-1 flex gap-2 font-mono text-[10px] text-white/30">
                    {["W1", "W2", "W3", "W4"].map((w) => (
                      <span key={w} className="flex-1 text-center">
                        {w}
                      </span>
                    ))}
                  </div>
                </GoalRow>

                {/* Contests */}
                <GoalRow
                  icon={<FiAward className="h-4 w-4" />}
                  title="Contests"
                  value={`${contestGoal.done} / ${contestGoal.target}`}
                >
                  <div className="flex gap-2">
                    {Array.from({ length: contestGoal.target }, (_, i) => {
                      const filled = i < contestGoal.done;
                      return (
                        <div
                          key={i}
                          className={`flex h-10 flex-1 items-center justify-center rounded-2xl border text-xs ${
                            filled
                              ? "border-blue-500/30 bg-blue-500/15 text-blue-300"
                              : "border-dashed border-white/15 text-white/30"
                          }`}
                        >
                          {filled ? <FiCheck className="h-4 w-4" /> : "next"}
                        </div>
                      );
                    })}
                  </div>
                </GoalRow>

                {/* Interview-prep topics */}
                <GoalRow
                  icon={<FiBookOpen className="h-4 w-4" />}
                  title="Interview-prep topics"
                  value={`${topicsDone} / ${topics.length}`}
                >
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t) => (
                      <span
                        key={t.name}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${topicStyles[t.status]}`}
                      >
                        {t.status === "done" && (
                          <FiCheckCircle className="h-3.5 w-3.5" />
                        )}
                        {t.status === "progress" && (
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
                        )}
                        {t.name}
                      </span>
                    ))}
                  </div>
                </GoalRow>
              </div>

              <button
                type="button"
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-dashed border-white/15 text-sm font-medium text-white/50 transition-all duration-300 hover:border-blue-500/40 hover:bg-white/[0.04] hover:text-white"
              >
                <FiPlus className="h-4 w-4" />
                Add a goal
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Goals;