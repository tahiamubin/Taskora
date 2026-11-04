"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Help } from "@/src/lib/types/help";

interface HelpCardProps {
  help: Help;
}

const HelpCard: React.FC<HelpCardProps> = ({ help }) => {
  const reduce = useReducedMotion();
  const t = (v: any) => (reduce ? {} : v);

  return (
    <motion.div
      whileHover={t({ y: -6 })}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="group relative h-full"
    >
      {/* Animated glow behind card on hover */}
      <motion.div
        aria-hidden
        initial={t({ opacity: 0 })}
        whileHover={t({ opacity: 1 })}
        transition={{ duration: 0.4 }}
        className="pointer-events-none absolute -inset-2 rounded-[32px] bg-blue-600/10 blur-2xl"
      />

      {/* Card shell — upgraded glass */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-5 transition-all duration-300 group-hover:border-blue-500/40 group-hover:bg-white/[0.05] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Top gradient sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-500/10 via-white/[0.03] to-transparent" />
        {/* Left accent line */}
        <div className="pointer-events-none absolute -left-px top-[20%] h-[30%] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Header: title + bug badge */}
        <div className="relative flex items-start justify-between gap-3 mb-4">
          <Link
            href={`/help/${help._id}`}
            className="text-base font-semibold text-white leading-snug line-clamp-2 transition-colors duration-300 hover:text-blue-400 group-hover:text-blue-300"
          >
            {help.title}
          </Link>

          <span className="shrink-0 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider rounded-md border border-red-500/30 bg-red-500/10 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.15)]">
            bug
          </span>
        </div>

        {/* Bug preview — inner panel */}
        <div className="relative mb-3 rounded-2xl border border-white/5 bg-black/40 p-3.5 shadow-[inset_-1px_0_0_rgba(59,130,246,0.3)] backdrop-blur-sm transition-colors duration-300 group-hover:bg-black/50">
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-blue-400/70">
            // bug
          </p>
          <p className="text-sm text-white/70 line-clamp-3 leading-relaxed whitespace-pre-wrap transition-colors duration-300 group-hover:text-white/85">
            {help.bug}
          </p>
        </div>

        {/* Question link — inner panel */}
        <div className="relative mb-4 rounded-2xl border border-white/5 bg-black/40 p-3.5 backdrop-blur-sm transition-colors duration-300 group-hover:bg-black/50">
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40">
            // link
          </p>
          <a
            href={help.questionLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="block text-xs font-mono text-blue-400 hover:text-blue-300 hover:underline break-all line-clamp-1 transition-colors"
          >
            {help.questionLink}
          </a>
        </div>

        {/* Footer */}
        <div className="relative mt-auto flex items-center justify-between gap-3 border-t border-white/5 pt-4">
          <Link
            href={`/help-board/${help._id}`}
            className="group/btn inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/80 backdrop-blur transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/15 hover:text-blue-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            View Details
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            >
              →
            </span>
          </Link>

          {help.author?.name && (
            <span className="truncate max-w-[110px] font-mono text-[10px] text-white/30 transition-colors duration-300 group-hover:text-white/50">
              by {help.author.name}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HelpCard;