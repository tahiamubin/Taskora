"use client";

import { useEffect, useMemo, useState } from "react";
import { Direction, PlanFormValues, PrepPlan, PrepTopic } from "../lib/types/Prep";
import { moveItem } from "../lib/utils/Prep";


const STORAGE_KEY = "codetrail:prep-plans";

export function usePrepPlans() {
  const [plans, setPlans] = useState<PrepPlan[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPlans(JSON.parse(saved));
    } catch {
      // Ignore corrupted or unavailable storage and start fresh.
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
    } catch {
      // Storage may be full or unavailable; the UI keeps working in memory.
    }
  }, [plans, isLoaded]);

  const actions = useMemo(() => {
    const editPlan = (
      planId: string,
      update: (plan: PrepPlan) => PrepPlan,
    ) =>
      setPlans((prev) =>
        prev.map((plan) => (plan.id === planId ? update(plan) : plan)),
      );

    const editTopics = (
      planId: string,
      update: (topics: PrepTopic[]) => PrepTopic[],
    ) => editPlan(planId, (plan) => ({ ...plan, topics: update(plan.topics) }));

    return {
      addPlan: (values: PlanFormValues) =>
        setPlans((prev) => [
          ...prev,
          { id: crypto.randomUUID(), ...values, topics: [] },
        ]),

      updatePlan: (planId: string, values: PlanFormValues) =>
        editPlan(planId, (plan) => ({ ...plan, ...values })),

      deletePlan: (planId: string) =>
        setPlans((prev) => prev.filter((plan) => plan.id !== planId)),

      movePlan: (planId: string, direction: Direction) =>
        setPlans((prev) => {
          const index = prev.findIndex((plan) => plan.id === planId);
          return moveItem(prev, index, index + direction);
        }),

      addTopic: (planId: string, title: string) =>
        editTopics(planId, (topics) => [
          ...topics,
          { id: crypto.randomUUID(), title, done: false },
        ]),

      toggleTopic: (planId: string, topicId: string) =>
        editTopics(planId, (topics) =>
          topics.map((topic) =>
            topic.id === topicId ? { ...topic, done: !topic.done } : topic,
          ),
        ),

      renameTopic: (planId: string, topicId: string, title: string) =>
        editTopics(planId, (topics) =>
          topics.map((topic) =>
            topic.id === topicId ? { ...topic, title } : topic,
          ),
        ),

      moveTopic: (planId: string, topicId: string, direction: Direction) =>
        editTopics(planId, (topics) => {
          const index = topics.findIndex((topic) => topic.id === topicId);
          return moveItem(topics, index, index + direction);
        }),

      deleteTopic: (planId: string, topicId: string) =>
        editTopics(planId, (topics) =>
          topics.filter((topic) => topic.id !== topicId),
        ),
    };
  }, []);

  return { plans, isLoaded, actions };
}

export type PrepActions = ReturnType<typeof usePrepPlans>["actions"];