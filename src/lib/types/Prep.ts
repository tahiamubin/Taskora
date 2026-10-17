export interface PrepTopic {
  id: string;
  title: string;
  done: boolean;
}

export interface PrepPlan {
  id: string;
  title: string;
  company: string;
  /** ISO date string, e.g. "2026-11-02" */
  targetDate: string;
  topics: PrepTopic[];
}

export type PlanFormValues = Pick<PrepPlan, "title" | "company" | "targetDate">;

/** -1 moves an item up, 1 moves it down. */
export type Direction = -1 | 1;
