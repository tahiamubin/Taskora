"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { Calendar, TrashBin } from "@gravity-ui/icons";

import type { PrepPlan } from "../lib/types/interview-prep";
import { deleteInterview } from "../lib/actions/interview-prep";
import EditPrepPlanButton from "./EditPrepPlanModal";
import AddTopicOnInterview from "./AddTopicOnInterview";
import TopicList from "./TopicList";

interface PrepPlanCardProps {
  plan: PrepPlan;
}

export default function PrepPlanCard({ plan }: PrepPlanCardProps) {
  //console.log(plan)
  const router = useRouter();

  const topics = plan.topics ?? [];
  const total = topics.length;
  const done = topics.filter((topic) => topic.isDone).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const handleDelete = async () => {
    await deleteInterview(plan.id);
    router.refresh();
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
                {String(plan.targetDate).slice(0, 10)}
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center">
            <EditPrepPlanButton plan={plan} />
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              aria-label="Delete plan"
              onPress={handleDelete}
              className="rounded-full text-white/50 hover:text-red-400"
            >
              <TrashBin className="h-4 w-4" />
            </Button>
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

        <TopicList planId={plan._id} topics={topics} />
        <AddTopicOnInterview planId={plan._id} />
      </div>
    </article>
  );
}