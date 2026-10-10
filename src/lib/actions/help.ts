"use server";
type AskForHelpFormData = {
  title: string;
  questionLink: string;
  bug: string;
  tried: string;
  expected: string;
  userId: string;
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

  return res.json();
};

export const deleteSharedHelp = async (id: string) => {
  const res = await fetch(`${baseUrl}/shared-help/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const updateSharedHelp = async (
  id: string,
  data: Partial<AskForHelpFormData>,
  
) => {
  const res = await fetch(`${baseUrl}/shared-help/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Update failed: ${res.status}`);
  return res.json();
};
