"use server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllProblemById = async (id: string) => {
  const res = await fetch(`${baseUrl}/problems/${id}`);
  return res.json();
};
