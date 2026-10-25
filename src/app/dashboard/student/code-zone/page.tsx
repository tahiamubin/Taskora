import { CodingActivity } from "@/src/components/CodingActivity";
import { getAllProblemById } from "@/src/lib/api/problem";

import { ProblemList } from "@/src/components/ProblemList";
import { getAllContestById } from "@/src/lib/api/contest";
import { ContestList } from "@/src/components/ContestList";
import { getUser } from "@/src/lib/api/user";

const ProblemLogPage = async () => {
  const user = await getUser();
  const userId = user?.session.userId as string;

  const problems = await getAllProblemById(userId);
  const contests = await getAllContestById(userId);
  // const length = contests.length
  //console.log(problems);

  return (
    <div>
      <CodingActivity
        length={problems.length}
        contestLength={contests.length}
        problemsContent={<ProblemList problem={problems} />}
        contestsContent={<ContestList contest={contests} />}
      />
    </div>
  );
};

export default ProblemLogPage;
