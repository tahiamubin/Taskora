import { Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

import AddPrepPlanModal from "@/src/components/Prepplanmodal";

export default function InterviewPrepPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden px-4 py-24 sm:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <p className="font-mono text-sm text-white/40">
            <span className="text-blue-500">$</span> codetrail prep
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-white/70" />
          </p>

          <h1 className="mx-auto mt-6 max-w-2xl text-3xl font-medium leading-tight tracking-tight text-white sm:text-5xl">
            Prepare for your next{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              interview
            </span>
            .
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            Create a plan for each interview, break it into topics and tick them
            off as you go.
          </p>
        </header>
        {/* 
        {isLoaded &&
          (plans.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-white/10 bg-[#111111] px-8 py-16 text-center">
              <p className="font-mono text-sm text-white/40">
                <span className="text-blue-500">$</span> no plans yet
              </p>
              <p className="mt-3 text-sm text-white/60">
                Use &ldquo;Add Plan&rdquo; to create your first interview prep
                plan.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {plans.map((plan, index) => (
                <PrepPlanCard
                  key={plan.id}
                  plan={plan}
                  isFirst={index === 0}
                  isLast={index === plans.length - 1}
                  actions={actions}
                  onEdit={openEdit}
                />
              ))}
            </div>
          ))} */}
      </div>

      {/* <div className="fixed bottom-6 right-6 z-50">
        <Button className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-white/[0.08] px-5 text-sm font-medium text-white transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60">
          <Plus className="h-4 w-4 text-blue-400" aria-hidden="true" />
          Add Plan
        </Button>
      </div> */}

      <AddPrepPlanModal />
    </main>
  );
}
