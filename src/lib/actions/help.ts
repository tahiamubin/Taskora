"use server";
type AskForHelpFormData = {
  title: string;
  questionLink: string;
  bug: string;
  tried: string;
  expected: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const createHelp = async (data: AskForHelpFormData) => {
  const res = await fetch(`${baseUrl}/help`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json()
};
