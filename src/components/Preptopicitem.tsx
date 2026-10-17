"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Pencil,
  TrashBin,
  Xmark,
} from "@gravity-ui/icons";
import { Direction, PrepTopic } from "../lib/types/Prep";
import IconButton from "./Iconbutton";


interface PrepTopicItemProps {
  topic: PrepTopic;
  isFirst: boolean;
  isLast: boolean;
  onToggle: () => void;
  onRename: (title: string) => void;
  onMove: (direction: Direction) => void;
  onDelete: () => void;
}

export default function PrepTopicItem({
  topic,
  isFirst,
  isLast,
  onToggle,
  onRename,
  onMove,
  onDelete,
}: PrepTopicItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(topic.title);

  const startEditing = () => {
    setDraft(topic.title);
    setIsEditing(true);
  };

  const save = () => {
    const title = draft.trim();
    if (title && title !== topic.title) onRename(title);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="flex items-center gap-2 border-t border-white/5 py-2 first:border-t-0">
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") setIsEditing(false);
          }}
          aria-label="Topic name"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
        />
        <IconButton label="Save topic" onClick={save}>
          <Check className="h-4 w-4" />
        </IconButton>
        <IconButton label="Cancel editing" onClick={() => setIsEditing(false)}>
          <Xmark className="h-4 w-4" />
        </IconButton>
      </li>
    );
  }

  return (
    <li className="group flex items-center gap-3 border-t border-white/5 py-2.5 first:border-t-0">
      <input
        type="checkbox"
        checked={topic.done}
        onChange={onToggle}
        aria-label={`Mark "${topic.title}" as done`}
        className="size-4 shrink-0 accent-blue-500"
      />

      <span
        className={`min-w-0 flex-1 break-words text-sm ${
          topic.done ? "text-white/40 line-through" : "text-white/90"
        }`}
      >
        {topic.title}
      </span>

      <div className="flex items-center transition-opacity sm:opacity-0 sm:focus-within:opacity-100 sm:group-hover:opacity-100">
        <IconButton label="Move up" onClick={() => onMove(-1)} disabled={isFirst}>
          <ChevronUp className="h-4 w-4" />
        </IconButton>
        <IconButton label="Move down" onClick={() => onMove(1)} disabled={isLast}>
          <ChevronDown className="h-4 w-4" />
        </IconButton>
        <IconButton label="Edit topic" onClick={startEditing}>
          <Pencil className="h-4 w-4" />
        </IconButton>
        <IconButton label="Delete topic" onClick={onDelete} danger>
          <TrashBin className="h-4 w-4" />
        </IconButton>
      </div>
    </li>
  );
}