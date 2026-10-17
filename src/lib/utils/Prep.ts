import type { PrepPlan } from "../types/prep";

const MS_PER_DAY = 86_400_000;

export function getProgress(plan: PrepPlan) {
  const total = plan.topics.length;
  const done = plan.topics.filter((topic) => topic.done).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return { done, total, percent };
}

export function getDaysLeft(targetDate: string) {
  const target = new Date(`${targetDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Math.ceil((target.getTime() - today.getTime()) / MS_PER_DAY);
}

export function formatDaysLeft(days: number) {
  if (days < 0) return "Date passed";
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return `${days} days left`;
}

export function formatDate(targetDate: string) {
  return new Date(`${targetDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Returns a new list with the item at `from` moved to `to`. */
export function moveItem<T>(list: T[], from: number, to: number): T[] {
  if (from < 0 || to < 0 || to >= list.length) return list;

  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}