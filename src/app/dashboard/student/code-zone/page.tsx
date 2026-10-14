import { CodingActivity } from "@/src/components/CodingActivity";
import { getAllProblem } from "@/src/lib/api/problem";

import { ProblemList } from "@/src/components/ProblemList";

const ProblemLogPage = async () => {
  const problems = await getAllProblem();

  return (
    <div>
      <CodingActivity
        length={problems.length}
        problemsContent={<ProblemList problem={problems} />}
      />
    </div>
  );
};

export default ProblemLogPage;
