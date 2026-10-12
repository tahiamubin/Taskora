
import { CodingActivity } from '@/src/components/CodingActivity';

import React from 'react';

const ProblemLogPage = async() => {
  //const problem = await getAllProblem()
  //console.log(problem)
  return (
    <div>
       {/* <ProblemList problem={problem}/> */}
      {/* <AddProblemModal /> */}
      <CodingActivity></CodingActivity>
    </div>
  );
};

export default ProblemLogPage;