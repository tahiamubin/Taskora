"use server";

// Same idea as your createClass action in "@/lib/actions/allClass".
// NOTE: I can't see that file, so this assumes your Express API from earlier
// (POST /problems). Adjust the URL / fetch call if yours works differently.

const API_URL =
  process.env.API_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000";

export type CreateProblemInput = {
  platform: string;
  difficulty: "Easy" | "Medium" | "Hard";
  url: string;
  status: "Attempted" | "Solved";
  tags: string[];
  description: string;
  userId: string;
};

export type CreateProblemResult = {
  insertedId?: string;
  error?: "duplicate" | "failed";
};

// The form has no title field, but the backend requires one,
// so build it from the link: "/problems/two-sum" -> "Two Sum"
const deriveTitle = (url: string, platform: string): string => {
  try {
    const segments = new URL(url).pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1] ?? "";
    if (/^[a-z][a-z0-9_-]{2,}$/i.test(last)) {
      return last.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }
  } catch {
    /* fall through */
  }
  return `${platform} problem`;
};

export async function createProblem(
  data: CreateProblemInput,
): Promise<CreateProblemResult> {
  const res = await fetch(`${API_URL}/problems`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, title: deriveTitle(data.url, data.platform) }),
    cache: "no-store",
  });

  if (res.status === 409) return { error: "duplicate" };
  if (!res.ok) return { error: "failed" };

  return res.json();
}