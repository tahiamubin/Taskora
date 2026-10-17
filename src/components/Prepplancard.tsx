"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@heroui/react";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Pencil,
  TrashBin,
} from "@gravity-ui/icons";
import { PrepPlan } from "../lib/types/Prep";
import { PrepActions } from "./Useprepplans";
import { formatDate, formatDaysLeft, getDaysLeft, getProgress } from "../lib/utils/Prep";
import IconButton from "./Iconbutton";
import PrepTopicItem from "./Preptopicitem";

interface PrepPlanCardProps {
  plan: PrepPlan;
  isFirst: boolean;
  isLast: boolean;
  actions: PrepActions;
  onEdit: (plan: PrepPlan) => void;
}

export default function PrepPlanCard({
  plan,
  isFirst,
  isLast,
  actions,
  onEdit,
}: PrepPlanCardProps) {
  const [newTopic, setNewTopic] = useState("");
  const { done, total, percent } = getProgress(plan);
  const daysLeft = getDaysLeft(plan.targetDate);

  const handleAddTopic = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = newTopic.trim();
    if (!title) return;

    actions.addTopic(plan.id, title);
    setNewTopic("");
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${plan.title}" and all of its topics?`)) {
      actions.deletePlan(plan.id);
    }
  };

  return (
    <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] sm:p-8">
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
            <IconButton
              label="Move plan up"
              onClick={() => actions.movePlan(plan.id, -1)}
              disabled={isFirst}
            >
              <ChevronUp className="h-4 w-4" />
            </IconButton>
            <IconButton
              label="Move plan down"
              onClick={() => actions.movePlan(plan.id, 1)}
              disabled={isLast}
            >
              <ChevronDown className="h-4 w-4" />
            </IconButton>
            <IconButton label="Edit plan" onClick={() => onEdit(plan)}>
              <Pencil className="h-4 w-4" />
            </IconButton>
            <IconButton label="Delete plan" onClick={handleDelete} danger>
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

        {plan.topics.length === 0 ? (
          <p className="mt-6 text-sm text-white/40">
            No topics yet. Add the first one below.
          </p>
        ) : (
          <ul className="mt-4">
            {plan.topics.map((topic, index) => (
              <PrepTopicItem
                key={topic.id}
                topic={topic}
                isFirst={index === 0}
                isLast={index === plan.topics.length - 1}
                onToggle={() => actions.toggleTopic(plan.id, topic.id)}
                onRename={(title) =>
                  actions.renameTopic(plan.id, topic.id, title)
                }
                onMove={(direction) =>
                  actions.moveTopic(plan.id, topic.id, direction)
                }
                onDelete={() => actions.deleteTopic(plan.id, topic.id)}
              />
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
            isDisabled={!newTopic.trim()}
            className="bg-white font-medium text-black hover:bg-gray-200"
          >
            Add
          </Button>
        </form>
      </div>
    </article>
  );
}