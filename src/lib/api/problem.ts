"use server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllProblem = async () => {
  const res = await fetch(`${baseUrl}/problems`);
  return res.json();
};
