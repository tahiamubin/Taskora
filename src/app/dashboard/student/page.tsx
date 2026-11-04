// Put this file at: app/dashboard/student/points/page.tsx

import Leaderboard from "@/src/components/Leaderboard";
import PointsHistory from "@/src/components/Pointshistory";
import PointsSummaryCard from "@/src/components/Pointssummarycard";
import { getLeaderboard, getMyPoints } from "@/src/lib/api/Points";
import { getUser } from "@/src/lib/api/user";

const PointsPage = async () => {
  const session = await getUser();
  const userId = session?.user?.id as string;

  const [summary, leaderboard] = await Promise.all([
    getMyPoints(userId),
    getLeaderboard(),
  ]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden px-4 py-24 sm:px-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 bg-clip-text text-transparent">
              points
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/60">
            Solve problems, join contests and move up the levels.
          </p>
        </header>

        <PointsSummaryCard total={summary.total} />

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="mb-4 text-lg font-medium text-white">
              Recent points
            </h2>
            <PointsHistory entries={summary.entries} />
          </section>

          <section>
            <h2 className="mb-4 text-lg font-medium text-white">Leaderboard</h2>
            <Leaderboard rows={leaderboard} currentUserId={userId} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default PointsPage;
