import { CodingActivity } from "@/src/components/CodingActivity";
import { getAllProblem } from "@/src/lib/api/problem";

import { ProblemList } from "@/src/components/ProblemList";
import { getAllContest } from "@/src/lib/api/contest";
import { ContestList } from "@/src/components/ContestList";

const ProblemLogPage = async () => {
  const problems = await getAllProblem();
  const contests = await getAllContest()
 // const length = contests.length
  //console.log(length)

  return (
    <div>
      <CodingActivity
        length={problems.length}
        contestLength = {contests.length}
        problemsContent={<ProblemList problem={problems} />}
        contestsContent={<ContestList contest={contests} />}
      />
    </div>
  );
};

export default ProblemLogPage;
