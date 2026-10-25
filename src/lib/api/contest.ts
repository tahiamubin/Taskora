"use server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllContestById = async (id: string) => {
  const res = await fetch(`${baseUrl}/contest/${id}`);
  return res.json();
};
