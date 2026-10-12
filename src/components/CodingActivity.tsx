"use client";
import { useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Code2, Trophy, Plus } from "lucide-react";

type TabId = "problems" | "contests";

const TABS: { id: TabId; label: string; icon: typeof Code2 }[] = [
  { id: "problems", label: "Problems", icon: Code2 },
  { id: "contests", label: "Contests", icon: Trophy },
];

interface CodingActivityProps {
  problemsContent?: ReactNode;
  contestsContent?: ReactNode;
  onAddProblem?: () => void;
}

export function CodingActivity({
  problemsContent,
  contestsContent,
  onAddProblem,
}: CodingActivityProps) {
  const [active, setActive] = useState<TabId>("problems");

  // Left/Right arrow keys move between tabs
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next =
      (index + (e.key === "ArrowRight" ? 1 : -1) + TABS.length) % TABS.length;
    setActive(TABS[next].id);
    document.getElementById(`tab-${TABS[next].id}`)?.focus();
  };

  return (
    <section className="text-white">
      <div className="mx-auto  max-w-7xl overflow-hidden rounded-2xl">
        {/* Tab list */}

        <div
          role="tablist"
          aria-label="Coding activity"
          className="flex w-full border-b border-white/10"
        >
          {TABS.map(({ id, label, icon: Icon }, index) => {
            const selected = active === id;
            return (
              <button
                key={id}
                id={`tab-${id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(id)}
                onKeyDown={(e) => onKeyDown(e, index)}
                className={[
                  "relative flex flex-1 flex-col items-center justify-center gap-2 px-4 py-4",
                  "text-sm font-semibold transition-colors outline-none",
                  "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/60",
                  selected
                    ? "bg-white/[0.1] text-white"
                    : "bg-transparent text-white/60 hover:bg-white/[0.14] hover:text-white",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
                {/* active underline */}
                <span
                  aria-hidden="true"
                  className={[
                    "pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-blue-500",
                    "shadow-[0_0_12px_2px] shadow-blue-600/20 transition-opacity",
                    selected ? "opacity-100" : "opacity-0",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>

        {/* Problems */}
        {active === "problems" && (
          <div
            role="tabpanel"
            id="panel-problems"
            aria-labelledby="tab-problems"
            className="px-5 pb-6 pt-5 sm:px-6"
          >
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 sm:p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    My Problems
                  </h3>
                  <p className="mt-1 text-sm text-white/40">
                    Manage your coding practice and progress.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onAddProblem}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-white/[0.08] px-5 text-sm font-medium text-white transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                >
                  <Plus className="h-4 w-4 text-blue-400" aria-hidden="true" />
                  Add Problem
                </button>
              </div>

              <div className="mt-5 text-sm text-white/60">
                {problemsContent ?? (
                  <p>Your existing problem table appears here.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contests */}
        {active === "contests" && (
          <div
            role="tabpanel"
            id="panel-contests"
            aria-labelledby="tab-contests"
            className="px-5 pb-6 pt-5 sm:px-6"
          >
            <div className="rounded-xl border border-white/10 bg-black/20 p-4 sm:p-5">
              <div>
                <h3 className="text-base font-semibold text-white">
                  My Contests
                </h3>
                <p className="mt-1 text-sm text-white/40">
                  Track your contest participation and performance.
                </p>
              </div>

              <div className="mt-5 text-sm text-white/60">
                {contestsContent ?? <p>Your contest history appears here.</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CodingActivity;
