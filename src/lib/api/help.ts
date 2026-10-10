"use server";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getHelp = async () => {
  const res = await fetch(`${baseUrl}/help`);
  return res.json();
};

export const getHelpById = async (id: string) => {
  const res = await fetch(`${baseUrl}/shared-help/${id}`);
  return res.json();
};
