"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import { createInterviewTopic } from "../lib/actions/interview-prep";

interface AddTopicOnInterviewProps {
  planId: string;
}

export default function AddTopicOnInterview({
  planId,
}: AddTopicOnInterviewProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [title, setTitle] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddTopic = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanTitle = title.trim();
    const userId = session?.user.id;
    if (!cleanTitle || !userId || isPending) return;

    setIsPending(true);
    setError(null);

    try {
      await createInterviewTopic({ planId, userId, title: cleanTitle });
      setTitle("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add topic");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTopic} className="mt-5 flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="New topic"
          placeholder="Add a topic, e.g. Binary Search"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/30"
        />
        <Button
          type="submit"
          isPending={isPending}
          isDisabled={!title.trim()}
          className="bg-white font-medium text-black hover:bg-gray-200"
        >
          Add
        </Button>
      </form>

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}