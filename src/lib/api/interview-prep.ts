"use server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getInterviewPrepById = async (id: string) => {
  const res = await fetch(`${baseUrl}/interview-prep/${id}`);
  return res.json();
};
