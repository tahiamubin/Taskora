import type { ReactNode } from "react";
import { Tabs } from "@heroui/react";
import { Code2, Trophy, Plus } from "lucide-react";

const tabClass =
  "relative flex h-auto flex-1 flex-col items-center justify-center gap-2 rounded-none px-4 py-4 " +
  "text-sm font-semibold text-white/60 outline-none transition-colors " +
  "hover:bg-white/[0.14] hover:text-white " +
  "data-[selected=true]:bg-white/[0.1] data-[selected=true]:text-white " +
  "focus-visible:ring-2 focus-visible:ring-blue-500/60";

const indicatorClass =
  "absolute inset-x-0 bottom-0 top-auto h-0.5 rounded-none bg-blue-500 " +
  "shadow-[0_0_12px_2px] shadow-blue-600/20";

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
  return (
    <section className="min-h-screen  text-white">
      <div className="mx-auto w-full p-10 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
        {/* Header */}
        <header className="px-5 pb-4 pt-5">
          <h2 className="text-lg font-semibold text-white">
            My Coding Activity
          </h2>
          <p className="mt-3 text-sm text-white/60">
            Track your practice and contest progress.
          </p>
        </header>

        <Tabs className="w-full" defaultSelectedKey="problems">
          <Tabs.ListContainer className="px-5">
            <Tabs.List
              aria-label="Coding activity"
              className="flex w-full overflow-hidden rounded-none border-b border-white/10 bg-transparent p-0"
            >
              <Tabs.Tab id="problems" className={tabClass}>
                <Code2 className="h-4 w-4" aria-hidden="true" />
                Problems
                <Tabs.Indicator className={indicatorClass} />
              </Tabs.Tab>

              <Tabs.Tab id="contests" className={tabClass}>
                <Tabs.Separator className="bg-white/10" />
                <Trophy className="h-4 w-4" aria-hidden="true" />
                Contests
                <Tabs.Indicator className={indicatorClass} />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          {/* Problems */}
          <Tabs.Panel id="problems" className="px-5 pb-5 pt-4">
            <div className="rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-white">
                  My Problems
                </h3>
                <button
                  type="button"
                  onClick={onAddProblem}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white
                             shadow-[0_0_20px] shadow-blue-600/20 transition-colors hover:bg-blue-400
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Add Problem
                </button>
              </div>

              <div className="mt-4 text-sm text-white/60">
                {problemsContent ?? (
                  <p>Your existing problem table appears here.</p>
                )}
              </div>
            </div>
          </Tabs.Panel>

          {/* Contests */}
          <Tabs.Panel id="contests" className="px-5 pb-5 pt-4">
            <div className="rounded-xl border border-white/10 p-4">
              <h3 className="text-base font-semibold text-white">
                My Contests
              </h3>
              <div className="mt-4 text-sm text-white/60">
                {contestsContent ?? <p>Your contest history appears here.</p>}
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </section>
  );
}

export default CodingActivity;
