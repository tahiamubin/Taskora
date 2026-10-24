"use server";

type ProblemFormData = {
  platform: string;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  solutionLink: string;
  attempted: "yes" | "no";
  concepts: string;
  description: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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

export const editProblemLog = async (
  data: Partial<ProblemFormData>,
  id: string,
) => {
  const res = await fetch(`${baseUrl}/problems/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Update failed: ${res.status}`);
  return res.json();
};

export const deleteClass = async (id: string) => {
  const res = await fetch(`${baseUrl}/problems/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

export const getInterviewTopics = async (planId: string, userId: string) => {
  const res = await fetch(
    `${baseUrl}/interview-topic/${planId}?userId=${userId}`,
    { cache: "no-store" },
  );

  return res.json();
};

export const toggleInterviewTopic = async (
  planId: string,
  topicId: string,
  userId: string,
  isDone: boolean,
) => {
  const res = await fetch(`${baseUrl}/interview-topic/${planId}/${topicId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ userId, isDone }),
  });

  return res.json();
};