import { FaGem, FaMedal } from "react-icons/fa";
import type { Level } from "../lib/utils/levels";

export default function LevelBadge({
  level,
  size = "md",
}: {
  level: Level;
  size?: "sm" | "md" | "lg";
}) {
  const Icon = level.diamond ? FaGem : FaMedal;
  const box = size === "lg" ? "h-16 w-16" : size === "md" ? "h-11 w-11" : "h-7 w-7";
  const icon = size === "lg" ? "h-7 w-7" : size === "md" ? "h-5 w-5" : "h-3.5 w-3.5";

  return (
    <div
      className={`flex ${box} shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${level.gradient}`}
      style={{ boxShadow: `0 0 30px ${level.glow}` }}
      aria-label={`${level.name} level`}
    >
      <Icon className={`${icon} text-black/70`} />
    </div>
  );
}