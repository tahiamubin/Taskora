export type Level = {
  name: string;
  min: number;
  gradient: string;
  text: string;
  glow: string;
  diamond?: boolean;
};

export const LEVELS: Level[] = [
  { name: "Bronze", min: 0, gradient: "from-amber-700 to-orange-400", text: "text-orange-300", glow: "rgba(251,146,60,0.35)" },
  { name: "Silver", min: 200, gradient: "from-slate-400 to-slate-200", text: "text-slate-200", glow: "rgba(203,213,225,0.3)" },
  { name: "Gold", min: 600, gradient: "from-yellow-500 to-amber-300", text: "text-yellow-300", glow: "rgba(250,204,21,0.35)" },
  { name: "Platinum", min: 1500, gradient: "from-cyan-400 to-sky-200", text: "text-cyan-200", glow: "rgba(103,232,249,0.35)" },
  { name: "Diamond", min: 3000, gradient: "from-blue-500 to-violet-400", text: "text-blue-300", glow: "rgba(96,165,250,0.45)", diamond: true },
];

export function getLevelInfo(points: number) {
  let index = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (points >= LEVELS[i].min) index = i;
  }

  const current = LEVELS[index];
  const next = LEVELS[index + 1] ?? null;
  const percent = next
    ? Math.round(((points - current.min) / (next.min - current.min)) * 100)
    : 100;

  return { current, next, percent, toNext: next ? next.min - points : 0 };
}