"use client";

import React from "react";
import Link from "next/link";
import type { Help } from "@/src/lib/types/help";
import { deleteSharedHelp } from "../lib/actions/help";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface HelpWithUser extends Help {
  userId: string;
}

interface MyHelpCardProps {
  help: HelpWithUser;
}

const MyHelpCard: React.FC<MyHelpCardProps> = ({ help }) => {
  const router = useRouter()
  const handleEdit = () => {
    console.log("Edit", help._id);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    await deleteSharedHelp(id);
    toast.success("Help request deleted successfully!");
    router.refresh()
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#18181b] p-6 shadow-xl transition-colors duration-300 hover:border-blue-500/30 sm:p-8">
      {/* Header: title + bug badge */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <Link
          href={`/help-board/${help._id}`}
          className="flex-1 break-words text-lg font-semibold leading-snug text-white transition-colors hover:text-blue-400"
        >
          {help.title}
        </Link>

        <span className="shrink-0 rounded-md border border-red-500/20 bg-red-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-red-400">
          bug
        </span>
      </div>

      {/* Bug */}
      <div className="mb-3">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
          // bug
        </p>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70 line-clamp-2">
          {help.bug}
        </p>
      </div>

      {/* Tried */}
      <div className="mb-3">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
          // tried
        </p>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70 line-clamp-2">
          {help.tried}
        </p>
      </div>

      {/* Expected */}
      <div className="mb-4">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
          // expected
        </p>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70 line-clamp-2">
          {help.expected}
        </p>
      </div>

      {/* Question link */}
      <div className="mb-5">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
          // link
        </p>
        <a
          href={help.questionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block break-all font-mono text-xs text-blue-400 line-clamp-1 transition-colors hover:text-blue-300 hover:underline"
        >
          {help.questionLink}
        </a>
      </div>

      {/* Footer: actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-4">
        <Link
          href={`/help-board/${help._id}`}
          className="group/btn inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/80 transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300"
        >
          View Details
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
          >
            →
          </span>
        </Link>

        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-white/70 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300"
          >
            edit
          </button>
          <button
            onClick={() => handleDelete(help._id)}
            className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 font-mono text-xs text-red-400 transition-colors hover:border-red-500/40 hover:bg-red-500/15 hover:text-red-300"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyHelpCard;
