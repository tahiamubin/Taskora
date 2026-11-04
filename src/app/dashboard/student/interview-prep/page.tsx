import PrepPlanCard from "@/src/components/Prepplancard";
import AddPrepPlanModal from "@/src/components/Prepplanmodal";
import {
  getInterviewPrepById,
  getInterviewTopics,
} from "@/src/lib/api/interview-prep";
import { getUser } from "@/src/lib/api/user";
import type { PrepPlan } from "@/src/lib/types/interview-prep";

const InterviewPrep = async () => {
  const session = await getUser();
  const userId = session?.user?.id as string;
  
  if (!userId) {
    return (
      <main className="flex min-h-screen items-center justify-center  text-white">
        <p className="text-white/60">Please log in to view your prep plans.</p>
      </main>
    );
  }

  const plans: PrepPlan[] = await getInterviewPrepById(userId);

  await Promise.all(
    plans.map(async (plan) => {
      plan.topics = await getInterviewTopics(plan._id, userId);
    }),
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden  px-4 py-24 sm:px-8">
      {/* Background Glow - Added a subtle pulse via pure CSS */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 animate-pulse rounded-full bg-blue-600/15 blur-3xl duration-[8000ms]" />

      <div className="relative mx-auto max-w-5xl">
        {/* Header Section with CSS Slide-up animation */}
        <header className="mb-14 text-center animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out fill-mode-both">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-sm text-white/40 backdrop-blur-md">
            <span className="text-blue-500">$</span> codetrail prep
            <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-blue-400/80" />
          </p>

          <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Prepare for your next{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              interview
            </span>
            .
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            Create a plan for each interview, break it into topics, and tick
            them off as you go.
          </p>
        </header>

        {/* Content Section */}
        {plans.length === 0 ? (
          /* Modern Empty State */
          <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] px-8 py-20 text-center backdrop-blur-xl animate-in fade-in zoom-in-95 duration-700 ease-out delay-150 fill-mode-both">
            {/* Inner ambient glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
            
            {/* Floating terminal icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 animate-bounce items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-inner [animation-duration:3s]">
              <span className="font-mono text-xl text-white/30">{">_"}</span>
            </div>

            <p className="font-mono text-sm text-white/40">
              <span className="text-blue-500">$</span> no plans yet
            </p>
            <p className="mt-3 text-sm text-white/60">
              Use &ldquo;Create Plan&rdquo; to create your first interview prep plan.
            </p>
          </div>
        ) : (
          /* Grid with Staggered CSS Entrances */
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {plans.map((plan, index) => (
              <div
                key={plan._id}
                className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PrepPlanCard plan={plan} />
              </div>
            ))}
          </div>
        )}
      </div>

      <AddPrepPlanModal />
    </main>
  );
};

export default InterviewPrep;