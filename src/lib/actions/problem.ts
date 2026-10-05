"use server";

type ProblemFormData = {
  platform: string;
  difficulty: "Easy" | "Medium" | "Hard";
  solutionLink: string;
  attempted: "yes" | "no";
  concepts: string;
  description: string;
};

const baseUrl = process.env.BASEURL;


export const createProblemLog = async (data: ProblemFormData) => {
  const res = await fetch(`${baseUrl}/problems`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
