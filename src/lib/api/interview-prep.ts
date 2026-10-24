"use server";

import { ToggleTopicPayload, Topic } from "../types/interview-prep";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getInterviewPrepById = async (id: string) => {
  const res = await fetch(`${baseUrl}/interview-prep/${id}`);
  return res.json();
};


// Topics
export const getInterviewTopics = async (
  planId: string,
  userId: string,
): Promise<Topic[]> => {
  const res = await fetch(
    `${baseUrl}/interview-topic/${planId}?userId=${userId}`,
  );

 //if (!res.ok) throw new Error("Failed to load topics");

  return res.json();
};

export const toggleInterviewTopic = async (data: ToggleTopicPayload) => {
  const res = await fetch(
    `${baseUrl}/interview-topic/${data.planId}/${data.topicId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: data.userId,
        isDone: data.isDone,
      }),
    },
  );

  if (!res.ok) throw new Error("Failed to update topic");

  return res.json();
};
