"use client";

import React, { useState } from "react";

interface HelpCommentsProps {
  helpId: string;
}

interface Comment {
  _id: string;
  author: string;
  text: string;
  createdAt: string;
  parentId?: string | null;
}

const HelpComments: React.FC<HelpCommentsProps> = ({ helpId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const currentUser = "You"; // TODO: real auth

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed || submitting) return;
    try {
      setSubmitting(true);
      // TODO: POST /problems/:helpId/comments
      const newComment: Comment = {
        _id: crypto.randomUUID(),
        author: currentUser,
        text: trimmed,
        createdAt: new Date().toISOString(),
        parentId: null,
      };
      setComments((prev) => [...prev, newComment]);
      setText("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplySubmit = async (parentId: string) => {
    const trimmed = replyText.trim();
    if (!trimmed || submitting) return;
    try {
      setSubmitting(true);
      // TODO: POST /comments/:parentId/replies
      const newReply: Comment = {
        _id: crypto.randomUUID(),
        author: currentUser,
        text: trimmed,
        createdAt: new Date().toISOString(),
        parentId,
      };
      setComments((prev) => [...prev, newReply]);
      setReplyText("");
      setReplyTo(null);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    // TODO: DELETE /comments/:id
    setComments((prev) =>
      prev.filter((c) => c._id !== id && c.parentId !== id)
    );
  };

  const topLevel = comments.filter((c) => !c.parentId);
  const repliesOf = (parentId: string) =>
    comments.filter((c) => c.parentId === parentId);

  return (
    <div className="flex flex-col gap-4">
      {/* Composer */}
      <div className="flex flex-col gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your approach or help someone understand this problem..."
          rows={3}
          maxLength={1000}
          className="w-full resize-none rounded-2xl border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder-white/30 transition-colors focus:border-blue-500/50 focus:outline-none"
        />
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-white/30">
            {text.length}/1000
          </span>
          <button
            onClick={handleSubmit}
            disabled={!text.trim() || submitting}
            className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-black transition-all duration-300 hover:bg-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </div>

      {/* List */}
      {topLevel.length === 0 ? (
        <p className="py-6 text-center font-mono text-xs text-white/30">
          no discussion yet. be the first to share an idea.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-white/5">
          {topLevel.map((c) => (
            <div key={c._id} className="py-4 first:pt-0">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 font-mono text-xs font-medium text-blue-400">
                  {c.author[0]?.toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white">
                        {c.author}
                      </span>
                      <span className="font-mono text-[10px] text-white/30">
                        {new Date(c.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {c.author === currentUser && (
                      <button
                        onClick={() => handleDelete(c._id)}
                        aria-label="Delete comment"
                        className="font-mono text-[10px] text-red-400 transition-colors hover:text-red-300"
                      >
                        delete
                      </button>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap break-words text-sm text-white/70">
                    {c.text}
                  </p>

                  <button
                    onClick={() => setReplyTo(replyTo === c._id ? null : c._id)}
                    className="mt-2 font-mono text-[10px] text-white/40 transition-colors hover:text-blue-400"
                  >
                    {replyTo === c._id ? "cancel" : "reply"}
                  </button>

                  {replyTo === c._id && (
                    <div className="mt-2 flex flex-col gap-2">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        rows={2}
                        maxLength={500}
                        className="w-full resize-none rounded-2xl border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-blue-500/50 focus:outline-none"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleReplySubmit(c._id)}
                          disabled={!replyText.trim() || submitting}
                          className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-black transition-all duration-300 hover:bg-blue-500 hover:text-white disabled:opacity-40"
                        >
                          Post Reply
                        </button>
                      </div>
                    </div>
                  )}

                  {repliesOf(c._id).length > 0 && (
                    <div className="mt-3 flex flex-col gap-3 border-l border-white/10 pl-4">
                      {repliesOf(c._id).map((r) => (
                        <div key={r._id} className="flex gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 font-mono text-[10px] font-medium text-blue-400">
                            {r.author[0]?.toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-white">
                                  {r.author}
                                </span>
                                <span className="font-mono text-[10px] text-white/30">
                                  {new Date(r.createdAt).toLocaleString()}
                                </span>
                              </div>
                              {r.author === currentUser && (
                                <button
                                  onClick={() => handleDelete(r._id)}
                                  className="font-mono text-[10px] text-red-400 transition-colors hover:text-red-300"
                                >
                                  delete
                                </button>
                              )}
                            </div>
                            <p className="whitespace-pre-wrap break-words text-sm text-white/70">
                              {r.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HelpComments;