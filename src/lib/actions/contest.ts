"use server";

import { ContestFormData } from "../types/contest";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const createContest = async (data: ContestFormData) => {
  const res = await fetch(`${baseUrl}/contest`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const editContest = async (
  data: Partial<ContestFormData>,
  id: string,
) => {
  const res = await fetch(`${baseUrl}/contest/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Update failed: ${res.status}`);
  return res.json();
};

export const deleteContest = async (id: string) => {
  const res = await fetch(`${baseUrl}/contest/${id}`, {
    method: "DELETE",
  });

  return res.json();
};

