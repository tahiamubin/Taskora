"use client";

import { useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Code2, Trophy } from "lucide-react";
import AddProblemModal from "./AddProblemModal";
import AddContestModal from "./AddContestModal";

type TabId = "problems" | "contests";

const TABS: { id: TabId; label: string; icon: typeof Code2 }[] = [
  { id: "problems", label: "Problems", icon: Code2 },
  { id: "contests", label: "Contests", icon: Trophy },
];

interface CodingActivityProps {
  /** Number of problems stored in the database. */
  length?: number;
  contestLength?: number;
  problemsContent?: ReactNode;
  contestsContent?: ReactNode;
}

export function CodingActivity({
  length = 0,
  contestLength = 0,
  problemsContent,
  contestsContent,
}: CodingActivityProps) {
  const [active, setActive] = useState<TabId>("problems");
  const hasProblems = length >= 0;
  const hasContest = contestLength >= 0;

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
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl">
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

                {/* Empty state: button in the header */}
                {!hasProblems && <AddProblemModal />}
              </div>

              <div className="mt-5 text-sm text-white/60">
                {hasProblems ? (
                  problemsContent
                ) : (
                  <p>Your existing problem table appears here.</p>
                )}
              </div>
            </div>

            {/* Has data: floating button at the bottom right */}
            {hasProblems && <AddProblemModal />}
          </div>
        )}

        {/* Contests */}
        {active === "contests" && (
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
                    My Contest
                  </h3>
                  <p className="mt-1 text-sm text-white/40">
                    Manage your coding practice and progress.
                  </p>
                </div>

                {/* Empty state: button in the header */}
                {!hasContest && <AddContestModal />}
              </div>

              <div className="mt-5 text-sm text-white/60">
                {hasContest ? (
                  contestsContent
                ) : (
                  <p>Your existing problem table appears here.</p>
                )}
              </div>
            </div>

            {/* Has data: floating button at the bottom right */}
            {hasContest && <AddContestModal />}
          </div>
        )}
      </div>
    </section>
  );
}

export default CodingActivity;
