"use client";

import { useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, useOverlayState } from "@heroui/react";
import { Calendar, Pencil, TrashBin } from "@gravity-ui/icons";

import { formatDate, formatDaysLeft, getDaysLeft } from "../lib/utils/Prep";

import IconButton from "./Iconbutton";

import { PrepPlan, Topic } from "../lib/types/interview-prep";
import {
  createInterviewTopic,
  deleteInterview,
} from "../lib/actions/interview-prep";
import { authClient } from "../lib/auth-client";

interface PrepPlanCardProps {
  plan: PrepPlan;
}

export default function PrepPlanCard({ plan }: PrepPlanCardProps) {
  const router = useRouter();
  const editState = useOverlayState();
  const [isPending, startTransition] = useTransition();
  const [newTopic, setNewTopic] = useState("");

  const topics = plan.topics ?? [];
  const total = topics.length;
  const done = topics.filter((t) => t.done).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const daysLeft = getDaysLeft(plan.targetDate);

  const run = (task: () => Promise<unknown>) => {
    startTransition(async () => {
      try {
        await task();
        router.refresh();
      } catch (err) {
        window.alert(
          err instanceof Error ? err.message : "Something went wrong.",
        );
      }
    });
  };

  const handleAddTopic = async (e: FormEvent<HTMLFormElement>) => {
    const { data: session } = authClient.useSession();
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as unknown as Topic;
    //console.log(data);
    const topicData = {
      ...data,
      userId: session?.user.id,
    };

    await createInterviewTopic(topicData);
  };

  const handleDelete = async (id: string) => {
    //console.log("clicked id: ", id)
    await deleteInterview(id);
    router.refresh();
    //console.log("clicked id: ", id);
  };

  return (
    <article
      className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-opacity sm:p-8 ${
        isPending ? "opacity-70" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-400/10 via-slate-500/5 to-transparent" />
      <div className="pointer-events-none absolute -left-px top-[30%] h-[20%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

      <div className="relative">
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="break-words text-xl font-medium tracking-tight text-white">
              {plan.title}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
              <span>{plan.company}</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {formatDate(plan.targetDate)}
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs ${
                  daysLeft < 0
                    ? "border-white/10 bg-white/5 text-white/40"
                    : "border-blue-500/30 bg-blue-500/10 text-blue-300"
                }`}
              >
                {formatDaysLeft(daysLeft)}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center">
            <IconButton label="Edit plan" onClick={editState.open}>
              <Pencil className="h-4 w-4" />
            </IconButton>
            <IconButton
              label="Delete plan"
              onClick={() => handleDelete(plan._id)}
              danger
            >
              <TrashBin className="h-4 w-4" />
            </IconButton>
          </div>
        </header>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between font-mono text-xs text-white/40">
            <span>
              {done}/{total} topics
            </span>
            <span>{percent}%</span>
          </div>
          <div
            role="progressbar"
            aria-label={`${plan.title} progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-sky-300 transition-[width] duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {total === 0 ? (
          <p className="mt-6 text-sm text-white/40">
            No topics yet. Add the first one below.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col">
            {topics.map((topic) => (
              <li
                key={topic._id}
                className="group flex items-center gap-3 border-b border-white/5 py-2.5 last:border-b-0"
              >
                <input
                  id={`topic-${topic._id}`}
                  type="checkbox"
                  checked={topic.done}
                  onChange={() =>
                    run(() => toggleTopic(plan._id, topic._id, !topic.done))
                  }
                  className="h-4 w-4 cursor-pointer accent-blue-500"
                />
                <label
                  htmlFor={`topic-${topic._id}`}
                  className={`min-w-0 flex-1 cursor-pointer break-words text-sm ${
                    topic.done ? "text-white/40 line-through" : "text-white/80"
                  }`}
                >
                  {topic.title}
                </label>
                <IconButton
                  label="Delete topic"
                  onClick={() => run(() => deleteTopic(plan._id, topic._id))}
                  danger
                >
                  <TrashBin className="h-4 w-4" />
                </IconButton>
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleAddTopic} className="mt-5 flex gap-2">
          <input
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            aria-label="New topic"
            placeholder="Add a topic, e.g. Binary Search"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/30"
          />
          <Button
            type="submit"
            isDisabled={!newTopic.trim() || isPending}
            className="bg-white font-medium text-black hover:bg-gray-200"
          >
            Add
          </Button>
        </form>
      </div>

      {/* <EditPrepPlanModal state={editState} plan={plan} /> */}
    </article>
  );
}
