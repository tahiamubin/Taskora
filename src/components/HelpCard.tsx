"use client";

import React from "react";
import Link from "next/link";
import type { Help } from "@/src/lib/types/help";

interface HelpCardProps {
  help: Help;
}

const HelpCard: React.FC<HelpCardProps> = ({ help }) => {
  return (
    <div className="group relative">
      {/* Soft glow behind card */}
      <div className="pointer-events-none absolute -inset-2 rounded-[32px] bg-blue-600/5 blur-2xl opacity-0 duration-500 " />

      {/* Card shell — glass */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111111]/80 backdrop-blur-xl p-5 transition-all duration-300 hover:border-blue-500/30 hover:bg-[#141414]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Subtle top sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.04] to-transparent" />

        {/* Header: title + bug badge */}
        <div className="relative flex items-start justify-between gap-3 mb-4">
          <Link
            href={`/help/${help._id}`}
            className="text-base font-semibold text-white leading-snug line-clamp-2 transition-colors hover:text-blue-400"
          >
            {help.title}
          </Link>

          <span className="shrink-0 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider rounded-md border border-red-500/20 bg-red-500/10 text-red-400">
            bug
          </span>
        </div>

        {/* Bug preview — inner panel */}
        <div className="relative mb-3 rounded-2xl border border-white/5 bg-black/50 p-3 shadow-[inset_-1px_0_0_rgba(59,130,246,0.35)]">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
            // bug
          </p>
          <p className="text-sm text-white/70 line-clamp-3 leading-relaxed whitespace-pre-wrap">
            {help.bug}
          </p>
        </div>

        {/* Question link — inner panel */}
        <div className="relative mb-4 rounded-2xl border border-white/5 bg-black/50 p-3">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-white/40">
            // link
          </p>
          <a
            href={help.questionLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="block text-xs font-mono text-blue-400 hover:text-blue-300 hover:underline break-all line-clamp-1"
          >
            {help.questionLink}
          </a>
        </div>

        {/* Footer */}
        <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-white/5 pt-4">
          <Link
            href={`/help-board/${help._id}`}
            className="group/btn inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/80 backdrop-blur transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300"
          >
            View Details
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/btn:translate-x-0.5"
            >
              →
            </span>
          </Link>

          {help.author?.name && (
            <span className="truncate max-w-[110px] font-mono text-[10px] text-white/30">
              by {help.author.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpCard;