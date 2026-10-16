
"use client";
import { Label } from "@heroui/react";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type Interview = {
  id: string;
  company: string;
  position: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  completed: boolean;
};

type Filter = "upcoming" | "completed" | "all";

const STORAGE_KEY = "code-trail:interview-prep";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/10 [color-scheme:dark]";

const toDate = (i: Interview) => new Date(`${i.date}T${i.time || "00:00"}`);

const formatWhen = (i: Interview) => {
  const d = toDate(i);
  const day = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const time = i.time
    ? d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : "";
  return time ? `${day}, ${time}` : day;
};

// Relative label, e.g. "Today", "In 3 days", "2 days ago"
const relative = (i: Interview) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const target = new Date(`${i.date}T00:00`);
  const diff = Math.round((target.getTime() - start.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff > 1) return `In ${diff} days`;
  if (diff === -1) return "Yesterday";
  return `${Math.abs(diff)} days ago`;
};

const InterviewTask = () => {
  const [items, setItems] = useState<Interview[]>([]);
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [loaded, setLoaded] = useState(false);

  // TODO: replace localStorage with server actions (e.g. lib/actions/interview.ts)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore corrupted storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items, loaded]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    const next: Interview = {
      id: crypto.randomUUID(),
      company: data.company.trim(),
      position: data.position.trim(),
      date: data.date,
      time: data.time,
      completed: false,
    };

    setItems((prev) => [...prev, next]);
    form.reset();
    toast.success("Interview added");
  };

  const toggle = (id: string) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)),
    );

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Interview removed");
  };

  const doneCount = items.filter((i) => i.completed).length;
  const percent = items.length ? Math.round((doneCount / items.length) * 100) : 0;

  const visible = useMemo(() => {
    return items
      .filter((i) =>
        filter === "all" ? true : filter === "completed" ? i.completed : !i.completed,
      )
      .sort((a, b) => toDate(a).getTime() - toDate(b).getTime());
  }, [items, filter]);

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "upcoming", label: "Upcoming", count: items.length - doneCount },
    { key: "completed", label: "Completed", count: doneCount },
    { key: "all", label: "All", count: items.length },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#18181b] p-6 shadow-xl sm:p-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Interview Prep</h2>
            <p className="mt-1 text-sm text-gray-400">
              Track every interview and tick it off once it&apos;s done.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-2xl font-semibold text-white">
              {doneCount}
              <span className="text-gray-500">/{items.length}</span>
            </p>
            <p className="text-xs text-gray-400">completed</p>
          </div>
        </div>

        {/* Progress */}
        <div
          className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Interviews completed"
        >
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Add form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="company" className="text-gray-200">
                Company
              </Label>
              <input
                id="company"
                name="company"
                required
                placeholder="e.g. Stripe"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="position" className="text-gray-200">
                Position
              </Label>
              <input
                id="position"
                name="position"
                required
                placeholder="e.g. Frontend Engineer"
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="date" className="text-gray-200">
                Date
              </Label>
              <input
                id="date"
                name="date"
                type="date"
                required
                className={inputClass}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="time" className="text-gray-200">
                Time
              </Label>
              <input id="time" name="time" type="time" className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="reset"
              className="w-full rounded-xl border border-white/10 bg-transparent px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 sm:w-auto"
            >
              Reset
            </button>
            <button
              type="submit"
              className="w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 active:scale-[0.98] sm:w-auto"
            >
              Add interview
            </button>
          </div>
        </form>

        <div className="my-8 border-t border-white/10" />

        {/* Filter tabs */}
        <div className="mb-4 flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setFilter(t.key)}
              aria-pressed={filter === t.key}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                filter === t.key
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t.label}
              <span
                className={`ml-1.5 text-xs ${
                  filter === t.key ? "text-black/60" : "text-gray-500"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* List */}
        {visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 px-4 py-10 text-center">
            <p className="text-sm font-medium text-gray-200">
              {filter === "completed"
                ? "No completed interviews yet"
                : "No interviews here yet"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {filter === "completed"
                ? "Tick an interview once it's done and it will show up here."
                : "Add your next interview above to start tracking it."}
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {visible.map((i) => (
              <li
                key={i.id}
                className={`group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 transition hover:bg-white/10 ${
                  i.completed ? "opacity-60" : ""
                }`}
              >
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={i.completed}
                  aria-label={`Mark ${i.company} interview as ${
                    i.completed ? "not completed" : "completed"
                  }`}
                  onClick={() => toggle(i.id)}
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition active:scale-90 ${
                    i.completed
                      ? "border-white bg-white text-black"
                      : "border-white/30 text-transparent hover:border-white/60"
                  }`}
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm font-semibold text-white ${
                      i.completed ? "line-through decoration-white/40" : ""
                    }`}
                  >
                    {i.company}
                  </p>
                  <p className="truncate text-sm text-gray-400">{i.position}</p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-sm text-gray-200">{formatWhen(i)}</p>
                  <p className="text-xs text-gray-500">
                    {i.completed ? "Done" : relative(i)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => remove(i.id)}
                  aria-label={`Delete ${i.company} interview`}
                  className="shrink-0 rounded-lg p-1.5 text-gray-500 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  >
                    <path d="M5 5l10 10M15 5L5 15" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InterviewTask;