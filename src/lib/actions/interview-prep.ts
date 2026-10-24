"use server";

import { CreateTopicPayload, PlanFormValues} from "../types/interview-prep";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const createInterviewPrep = async (data: PlanFormValues) => {
  const res = await fetch(`${baseUrl}/interview-prep`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteInterview = async (id: string) => {
  const res = await fetch(`${baseUrl}/interview-prep/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const updateInterview = async (id: string, data: PlanFormValues) => {
  const res = await fetch(`${baseUrl}/interview-prep/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// topics

export const createInterviewTopic = async (data: CreateTopicPayload) => {
  const res = await fetch(`${baseUrl}/interview-topic`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to add topic");
  }

  return res.json();
};