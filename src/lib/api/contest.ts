"use server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllContest = async () => {
  const res = await fetch(`${baseUrl}/contest`);
  return res.json();
};
