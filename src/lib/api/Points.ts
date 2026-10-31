import type { LeaderboardRow, PointsSummary } from "../types/points";

// Use the same baseUrl as your other api files
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getMyPoints = async (userId: string): Promise<PointsSummary> => {
  try {
    const res = await fetch(`${baseUrl}/points/${userId}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed");
    return res.json();
  } catch {
    return { total: 0, entries: [] }; // page still works before backend exists
  }
};

export const getLeaderboard = async (): Promise<LeaderboardRow[]> => {
  try {
    const res = await fetch(`${baseUrl}/leaderboard`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed");
    return res.json();
  } catch {
    return [];
  }
};