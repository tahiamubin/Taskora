export interface PointEntry {
  _id: string;
  type: string; // "problem" | "contest" | "prep" | "revoke" ...
  points: number; // can be negative
  reason: string;
  createdAt: string;
}

export interface PointsSummary {
  total: number;
  entries: PointEntry[];
}

export interface LeaderboardRow {
  userId: string;
  name: string;
  total: number;
  contests: number;
}