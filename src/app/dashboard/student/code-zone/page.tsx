import { CodingActivity } from "@/src/components/CodingActivity";

import React from "react";

const ProblemLogPage = async () => {
  //const problem = await getAllProblem()
  //console.log(problem)
  return (
    <div>
      {/* <ProblemList problem={problem}/> */}
      {/* <AddProblemModal /> */}
      {/* <header className="px-5 pb-5 pt-6 sm:px-6">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          My Coding Activity
        </h2>
        <p className="mt-2 text-sm text-white/50">
          Track your practice and contest progress.
        </p>
      </header> */}
      <CodingActivity></CodingActivity>
    </div>
  );
};

export default ProblemLogPage;
