"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

import type { Topic } from "../lib/types/interview-prep";
import { toggleInterviewTopic } from "../lib/api/interview-prep";

export default function TopicList({
  planId,
  topics,
}: {
  planId: string;
  topics: Topic[];
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  //console.log(topics[0]); 

  const handleToggle = async (topic: Topic) => {
    const userId = session?.user.id;
    if (!userId || pendingId) return;

    setPendingId(topic.id);
    setError(null);

    try {
      await toggleInterviewTopic({
        planId,
        topicId: topic.id,
        userId,
        isDone: !topic.isDone,
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPendingId(null);
    }
  };

  if (topics.length === 0) {
    return (
      <p className="mt-6 text-sm text-white/40">
        No topics yet. Add the first one below.
      </p>
    );
  }

  return (
    <>
      <ol className="mt-4">
        {topics.map((topic, index) => (
          <li
            key={topic.id}
            className="flex items-center gap-3 border-t border-white/5 py-2.5 first:border-t-0"
          >
            <span className="w-5 font-mono text-xs text-white/40">
              {index + 1}.
            </span>

            <input
              type="checkbox"
              checked={topic.isDone}
              disabled={pendingId === topic._id}
              onChange={() => handleToggle(topic)}
              aria-label={`Mark "${topic.title}" as done`}
              className="size-4 shrink-0 accent-blue-500"
            />

            <span
              className={`min-w-0 flex-1 break-words text-sm ${
                topic.isDone ? "text-white/40 line-through" : "text-white/90"
              }`}
            >
              {topic.title}
            </span>
          </li>
        ))}
      </ol>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </>
  );
}