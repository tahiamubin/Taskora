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
  const plans: PrepPlan[] = await getInterviewPrepById(userId);

  await Promise.all(
    plans.map(async (plan) => {
      plan.topics = await getInterviewTopics(plan._id, userId);
    }),
  );

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

        {plans.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-white/10 bg-[#111111] px-8 py-16 text-center">
            <p className="font-mono text-sm text-white/40">
              <span className="text-blue-500">$</span> no plans yet
            </p>
            <p className="mt-3 text-sm text-white/60">
              Use &ldquo;Create Plan&rdquo; to create your first interview prep
              plan.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1  gap-6 ">
            {plans.map((plan) => (
              <PrepPlanCard key={plan._id} plan={plan} />
            ))}
          </div>
        )}
      </div>

      <AddPrepPlanModal />
    </main>
  );
};

export default InterviewPrep;
