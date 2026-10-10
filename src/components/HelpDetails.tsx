"use client";

import React from "react";
import { useRouter } from "next/navigation";
import HelpComments from "./HelpComments";
import type { Help } from "@/src/lib/types/help";

interface HelpDetailsProps {
  help: Help;
}

const BOARD_ROUTE = "/help-board";

const card =
  "rounded-3xl border border-white/10 bg-[#111111]/80 p-5 backdrop-blur-xl";

const label =
  "mb-3 font-mono text-[11px] uppercase tracking-wider text-white/50";

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section className={card}>
    <p className={label}>{title}</p>
    {children}
  </section>
);

const Body: React.FC<{ text?: string }> = ({ text }) => (
  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-white/70">
    {text?.trim() || (
      <span className="italic text-white/40">Nothing added.</span>
    )}
  </p>
);

const HelpDetails: React.FC<HelpDetailsProps> = ({ help }) => {
  const router = useRouter();

  // TODO: replace with real auth check
  const isOwner = true;

  const handleEdit = () => {
    console.log("Edit", help._id);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this problem?")) {
      console.log("Delete", help._id);
      router.push(BOARD_ROUTE);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white/80">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        {/* Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 font-mono text-xs text-white/50"
        >
          <button
            onClick={() => router.push(BOARD_ROUTE)}
            className="transition-colors hover:text-white/80"
          >
            help-board
          </button>
          <span aria-hidden="true">/</span>
          <span className="max-w-[220px] truncate text-white/60">
            {help.title}
          </span>
        </nav>

        <div className="flex flex-col gap-5">
          {/* Header */}
          <header className={card}>
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <h1 className="min-w-[220px] flex-1 break-words text-2xl font-semibold leading-tight text-white">
                {help.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/50">
              <span className="rounded-md border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[11px] uppercase tracking-wider text-red-400">
                bug
              </span>
              {help.author?.name && <span>by {help.author.name}</span>}
              {help.createdAt && (
                <span>• {new Date(help.createdAt).toLocaleDateString()}</span>
              )}
              {help.questionLink && (
                <a
                  href={help.questionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-blue-400 transition-colors hover:text-blue-300"
                >
                  question link ↗
                </a>
              )}
            </div>
          </header>

          <Section title="// problem">
            <Body text={help.bug} />
          </Section>

          <Section title="// what i tried">
            <Body text={help.tried} />
          </Section>

          <Section title="// expected behavior">
            <Body text={help.expected} />
          </Section>

          {/* Comments live in their own component */}
          <Section title="// discussion">
            <HelpComments helpId={help._id} />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default HelpDetails;
