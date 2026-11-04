"use client";

import { useState, useId } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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

const ease = [0.22, 1, 0.36, 1] as const;

export function CodingActivity({
  length = 0,
  contestLength = 0,
  problemsContent,
  contestsContent,
}: CodingActivityProps) {
  const [active, setActive] = useState<TabId>("problems");
  const hasProblems = length >= 0;
  const hasContest = contestLength >= 0;
  const reduce = useReducedMotion();
  const t = (v: any) => (reduce ? {} : v);

  const layoutId = useId();

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
      {/* Outer Glass Container */}
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-2xl shadow-2xl shadow-black/50">
        
        {/* Tab List */}
        <div
          role="tablist"
          aria-label="Coding activity"
          className="relative flex w-full border-b border-white/5 bg-white/[0.01]"
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
                  "group relative flex flex-1 flex-col items-center justify-center gap-2 px-4 py-5",
                  "text-sm font-semibold transition-colors outline-none",
                  "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500/60",
                  selected ? "text-white" : "text-white/50 hover:text-white/80",
                ].join(" ")}
              >
                {/* Hover background for inactive tabs */}
                {!selected && (
                  <span className="absolute inset-0 bg-white/[0.03] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                )}

                {/* Active tab glass background */}
                {selected && (
                  <motion.span
                    layoutId={`${layoutId}-tab-bg`}
                    className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent border-b border-white/5"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="relative z-10 flex items-center gap-2.5">
                  <Icon
                    className={`h-4 w-4 transition-transform duration-300 ${
                      selected
                        ? "scale-110 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"
                        : "group-hover:scale-110 group-hover:text-white/80"
                    }`}
                    aria-hidden="true"
                  />
                  {label}
                </div>

                {/* Active underline glow */}
                {selected && (
                  <motion.span
                    layoutId={`${layoutId}-tab-underline`}
                    className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[2px] bg-blue-500 shadow-[0_0_15px_3px] shadow-blue-500/40"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Panels Container */}
        <div className="relative p-1">
          <AnimatePresence mode="wait" initial={false}>
            {active === "problems" && (
              <motion.div
                key="problems"
                role="tabpanel"
                id="panel-problems"
                aria-labelledby="tab-problems"
                initial={t({ opacity: 0, y: 15, filter: "blur(8px)" })}
                animate={t({ opacity: 1, y: 0, filter: "blur(0px)" })}
                exit={t({ opacity: 0, y: -15, filter: "blur(8px)" })}
                transition={{ duration: 0.4, ease }}
                className="px-5 pb-6 pt-5 sm:px-6"
              >
                {/* Inner Glass Card */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg backdrop-blur-xl sm:p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-white">
                        My Problems
                      </h3>
                      <p className="mt-1 text-sm text-white/50">
                        Manage your coding practice and progress.
                      </p>
                    </div>

                    {/* Empty state: button in the header */}
                    {!hasProblems && (
                      <motion.div
                        initial={t({ opacity: 0, scale: 0.9 })}
                        animate={t({ opacity: 1, scale: 1 })}
                        transition={{ duration: 0.4, ease, delay: 0.15 }}
                      >
                        <AddProblemModal />
                      </motion.div>
                    )}
                  </div>

                  <motion.div
                    initial={t({ opacity: 0 })}
                    animate={t({ opacity: 1 })}
                    transition={{ duration: 0.4, ease, delay: 0.1 }}
                    className="mt-6 text-sm text-white/70"
                  >
                    {hasProblems ? (
                      problemsContent
                    ) : (
                      <p className="rounded-xl border border-dashed border-white/10 bg-black/20 p-8 text-center text-white/40">
                        Your existing problem table appears here.
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Has data: floating button */}
                {hasProblems && (
                  <motion.div
                    initial={t({ opacity: 0, y: 10 })}
                    animate={t({ opacity: 1, y: 0 })}
                    transition={{ duration: 0.4, ease, delay: 0.2 }}
                  >
                    <AddProblemModal />
                  </motion.div>
                )}
              </motion.div>
            )}

            {active === "contests" && (
              <motion.div
                key="contests"
                role="tabpanel"
                id="panel-contests"
                aria-labelledby="tab-contests"
                initial={t({ opacity: 0, y: 15, filter: "blur(8px)" })}
                animate={t({ opacity: 1, y: 0, filter: "blur(0px)" })}
                exit={t({ opacity: 0, y: -15, filter: "blur(8px)" })}
                transition={{ duration: 0.4, ease }}
                className="px-5 pb-6 pt-5 sm:px-6"
              >
                {/* Inner Glass Card */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-lg backdrop-blur-xl sm:p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-white">
                        My Contests
                      </h3>
                      <p className="mt-1 text-sm text-white/50">
                        Track your competitive programming performance.
                      </p>
                    </div>

                    {/* Empty state: button in the header */}
                    {!hasContest && (
                      <motion.div
                        initial={t({ opacity: 0, scale: 0.9 })}
                        animate={t({ opacity: 1, scale: 1 })}
                        transition={{ duration: 0.4, ease, delay: 0.15 }}
                      >
                        <AddContestModal />
                      </motion.div>
                    )}
                  </div>

                  <motion.div
                    initial={t({ opacity: 0 })}
                    animate={t({ opacity: 1 })}
                    transition={{ duration: 0.4, ease, delay: 0.1 }}
                    className="mt-6 text-sm text-white/70"
                  >
                    {hasContest ? (
                      contestsContent
                    ) : (
                      <p className="rounded-xl border border-dashed border-white/10 bg-black/20 p-8 text-center text-white/40">
                        Your existing contest table appears here.
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Has data: floating button */}
                {hasContest && (
                  <motion.div
                    initial={t({ opacity: 0, y: 10 })}
                    animate={t({ opacity: 1, y: 0 })}
                    transition={{ duration: 0.4, ease, delay: 0.2 }}
                  >
                    <AddContestModal />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default CodingActivity;