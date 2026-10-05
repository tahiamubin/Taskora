import AddProblemModal from '@/src/components/AddProblemModal';
import { ProblemList } from '@/src/components/ProblemList';
import { getAllProblem } from '@/src/lib/api/problem';
import React from 'react';

const ProblemLogPage = async() => {
  const problem = await getAllProblem()
  console.log(problem)
  return (
    <div>
       <ProblemList problem={problem}/>
      <AddProblemModal />
    </div>
  );
};

export default ProblemLogPage;