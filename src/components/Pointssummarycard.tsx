import { getLevelInfo } from "../lib/utils/levels";
import LevelBadge from "./LevelBadge";


export default function PointsSummaryCard({ total }: { total: number }) {
  const { current, next, percent, toNext } = getLevelInfo(total);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-400/10 via-slate-500/5 to-transparent" />
      <div className="pointer-events-none absolute -left-px top-[30%] h-[20%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

      <div className="relative">
        <div className="flex items-center gap-5">
          <LevelBadge level={current} size="lg" />
          <div>
            <p className={`text-xl font-semibold ${current.text}`}>{current.name}</p>
            <p className="mt-1 text-4xl font-medium tracking-tight text-white">
              {total.toLocaleString("en-US")}
              <span className="ml-2 text-base text-white/40">points</span>
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between font-mono text-xs text-white/40">
            <span>{current.name}</span>
            <span>{next ? next.name : "Top level"}</span>
          </div>
          <div
            role="progressbar"
            aria-label="Progress to next level"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 transition-[width] duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-white/50">
            {next
              ? `${toNext.toLocaleString("en-US")} more points to reach ${next.name}.`
              : "You reached the highest level."}
          </p>
        </div>
      </div>
    </div>
  );
}