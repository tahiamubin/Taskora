import type { PointEntry } from "../lib/types/points";

const formatDate = (value: string) => {
  const d = new Date(value);
  return isNaN(d.getTime())
    ? "-"
    : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export default function PointsHistory({ entries }: { entries: PointEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/10 bg-[#111111] px-8 py-12 text-center">
        <p className="text-sm text-white/60">
          No points yet. Add a problem or a contest to earn your first points.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {entries.map((e) => {
        const positive = e.points >= 0;
        return (
          <li
            key={e._id}
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/50 px-4 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm text-white/80">{e.reason}</p>
              <p className="font-mono text-xs text-white/30">
                {e.type} · {formatDate(e.createdAt)}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 font-mono text-sm ${
                positive
                  ? "bg-blue-500/15 text-blue-300"
                  : "bg-red-500/15 text-red-400"
              }`}
            >
              {positive ? "+" : ""}
              {e.points}
            </span>
          </li>
        );
      })}
    </ul>
  );
}