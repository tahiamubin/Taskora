"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HelpComments from "./HelpComments";
import { Help } from "../lib/types/help";


interface HelpDetailsProps {
  help: Help;
}

const HelpDetails: React.FC<HelpDetailsProps> = ({ help }) => {
  const router = useRouter();
  const [showComments, setShowComments] = useState(true);

  // TODO: replace with real auth check
  const isOwner = true;

  const handleEdit = () => {
    console.log("Edit", help._id);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this problem?")) {
      console.log("Delete", help._id);
      router.push("/help-board");
    }
  };

  const handleShare = async () => {
    if (typeof navigator === "undefined") return;
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: help.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-2 font-mono text-xs text-white/40"
        >
          <button
            onClick={() => router.push("/help-board")}
            className="transition-colors hover:text-white/70"
          >
            help-board
          </button>
          <span aria-hidden="true">/</span>
          <span className="truncate max-w-[220px] text-white/50">
            {help.title}
          </span>
        </nav>

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-6 font-mono text-xs text-white/40 transition-colors hover:text-white/70"
        >
          ← back
        </button>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          {/* MAIN COLUMN */}
          <div className="flex flex-col gap-5">
            {/* Header card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111]/80 p-5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.04] to-transparent" />

              <div className="relative mb-4 flex flex-wrap items-start justify-between gap-3">
                <h1 className="flex-1 min-w-[220px] break-words text-2xl font-semibold leading-tight text-white">
                  {help.title}
                </h1>

                {isOwner && (
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={handleEdit}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-white/70 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300"
                    >
                      edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 font-mono text-xs text-red-400 transition-colors hover:border-red-500/40 hover:bg-red-500/15 hover:text-red-300"
                    >
                      delete
                    </button>
                  </div>
                )}
              </div>

              <div className="relative flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-red-500/20 bg-red-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-red-400">
                  bug
                </span>
                <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/50">
                  debug-log
                </span>
                {help.author?.name && (
                  <span className="font-mono text-[10px] text-white/40">
                    by {help.author.name}
                  </span>
                )}
                {help.createdAt && (
                  <span className="font-mono text-[10px] text-white/30">
                    • {new Date(help.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {/* Problem */}
            <section className="relative rounded-3xl border border-white/10 bg-[#111111]/80 p-5 backdrop-blur-xl shadow-[inset_-1px_0_0_rgba(59,130,246,0.35)]">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/40">
                // problem
              </p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70">
                {help.bug}
              </p>
            </section>

            {/* What I tried */}
            <section className="rounded-3xl border border-white/10 bg-[#111111]/80 p-5 backdrop-blur-xl">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/40">
                // what i tried
              </p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70">
                {help.tried}
              </p>
            </section>

            {/* Expected */}
            <section className="rounded-3xl border border-white/10 bg-[#111111]/80 p-5 backdrop-blur-xl">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/40">
                // expected behavior
              </p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70">
                {help.expected}
              </p>
            </section>

            {/* Discussion */}
            <section className="rounded-3xl border border-white/10 bg-[#111111]/80 p-5 backdrop-blur-xl">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                    // community discussion
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    Share your approach, ask a question, or help another
                    developer.
                  </p>
                </div>
                <button
                  onClick={() => setShowComments((s) => !s)}
                  className="shrink-0 font-mono text-xs text-white/40 transition-colors hover:text-white/70"
                >
                  {showComments ? "hide" : "show"}
                </button>
              </div>

              {showComments && <HelpComments helpId={help._id} />}
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
            {/* Quick actions */}
            <div className="rounded-3xl border border-white/10 bg-[#111111]/80 p-4 backdrop-blur-xl">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/40">
                // quick actions
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={help.questionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-3 py-2 text-center text-xs font-medium text-black transition-all duration-300 hover:bg-blue-500 hover:text-white"
                >
                  Open Question Link
                </a>
                <button
                  onClick={handleShare}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs text-white/70 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300"
                >
                  share
                </button>
                <button
                  onClick={() => router.push("/help-board")}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs text-white/70 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300"
                >
                  back to board
                </button>
              </div>
            </div>

            {/* Metadata */}
            <div className="rounded-3xl border border-white/10 bg-[#111111]/80 p-4 backdrop-blur-xl">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-white/40">
                // details
              </p>
              <dl className="flex flex-col gap-2 font-mono text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-white/40">status</dt>
                  <dd className="text-white/70">open</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-white/40">type</dt>
                  <dd className="text-white/70">bug</dd>
                </div>
                {help.author?.name && (
                  <div className="flex justify-between gap-2">
                    <dt className="text-white/40">author</dt>
                    <dd className="truncate text-white/70">
                      {help.author.name}
                    </dd>
                  </div>
                )}
                {help.createdAt && (
                  <div className="flex justify-between gap-2">
                    <dt className="text-white/40">created</dt>
                    <dd className="text-white/70">
                      {new Date(help.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                )}
                {help.updatedAt && (
                  <div className="flex justify-between gap-2">
                    <dt className="text-white/40">updated</dt>
                    <dd className="text-white/70">
                      {new Date(help.updatedAt).toLocaleDateString()}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HelpDetails;
