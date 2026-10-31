import { LeaderboardRow } from "../lib/types/points";
import { getLevelInfo } from "../lib/utils/levels";
import LevelBadge from "./LevelBadge";

export default function Leaderboard({
  rows,
  currentUserId,
}: {
  rows: LeaderboardRow[];
  currentUserId?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/10 bg-[#111111] px-8 py-12 text-center">
        <p className="text-sm text-white/60">
          The leaderboard is empty for now.
        </p>
      </div>
    );
  }

  return (
    <ol className="space-y-2">
      {rows.map((row, i) => {
        const { current } = getLevelInfo(row.total);
        const isMe = row.userId === currentUserId;
        return (
          <li
            key={row.userId}
            className={`flex items-center gap-4 rounded-2xl border px-4 py-3 ${
              isMe
                ? "border-blue-500/40 bg-blue-500/10"
                : "border-white/5 bg-black/50"
            }`}
          >
            <span
              className={`w-7 text-center font-mono text-sm ${
                i < 3 ? "text-blue-300" : "text-white/40"
              }`}
            >
              {i + 1}
            </span>
            <LevelBadge level={current} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-white/90">
                {row.name}
                {isMe && (
                  <span className="ml-2 text-xs text-blue-300">you</span>
                )}
              </p>
              <p className="font-mono text-xs text-white/30">
                {current.name} · {row.contests} contests
              </p>
            </div>
            <span className="font-mono text-base text-white/80">
              {row.total.toLocaleString("en-US")}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
