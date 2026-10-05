'use client';

import React, { useState } from 'react';

interface Problem {
  _id: string;
  name: string;
  platform: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | string;
  attempted: string;
  concepts: string;
  description: string;
  solutionLink: string;
}

interface ProblemListProps {
  problem: Problem[];
}

const difficultyColors: Record<string, string> = {
  Easy: 'text-green-400 bg-green-400/10 border-green-400/20',
  Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Hard: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export const ProblemList: React.FC<ProblemListProps> = ({ problem }) => {
  const [openDescription, setOpenDescription] = useState<string | null>(null);

  const activeProblem = problem.find((p) => p._id === openDescription);

  return (
    <div className="w-full bg-[#070707] p-4">
      {/* Header */}
      <div className="grid grid-cols-[2fr_1.2fr_1fr_0.8fr_1.5fr_1fr_1fr_1.5fr] gap-4 px-4 py-3 text-sm font-semibold text-gray-400 border-b border-white/10">
        <span>Name</span>
        <span>Platform</span>
        <span>Difficulty</span>
        <span>Attempted</span>
        <span>Concepts</span>
        <span>Description</span>
        <span>Solution</span>
        <span>Actions</span>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-2 mt-2">
        {problem.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[2fr_1.2fr_1fr_0.8fr_1.5fr_1fr_1fr_1.5fr] gap-4 items-center bg-[#111111] hover:bg-[#161616] transition-colors rounded-lg px-4 py-3 text-sm text-gray-200 border border-white/5"
          >
            <span className="font-medium text-white truncate">{item.name}</span>

            <span className="text-gray-300">{item.platform}</span>

            <span>
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium border ${
                  difficultyColors[item.difficulty] ||
                  'text-gray-400 bg-gray-400/10 border-gray-400/20'
                }`}
              >
                {item.difficulty}
              </span>
            </span>

            <span className="text-gray-300">{item.attempted}</span>

            <span className="text-gray-300 truncate">{item.concepts}</span>

            {/* Description Button */}
            <button
              onClick={() => setOpenDescription(item._id)}
              className="px-2 py-1 text-xs rounded-md bg-black/60 border border-white/10 text-gray-300 hover:text-white hover:bg-black/80 transition-colors"
            >
              View
            </button>

            <a
              href={item.solutionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 hover:underline truncate"
            >
              Link
            </a>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                className="px-3 py-1 text-xs rounded-md bg-black/60 border border-white/10 text-gray-300 hover:text-white hover:bg-black/80 transition-colors"
              >
                Edit
              </button>
              <button
                className="px-3 py-1 text-xs rounded-md bg-black/60 border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Description Modal */}
      {activeProblem && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setOpenDescription(null)}
        >
          <div
            className="bg-[#111111] border border-white/10 rounded-xl max-w-lg w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                {activeProblem.name}
              </h2>
              <button
                onClick={() => setOpenDescription(null)}
                className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>

            <p className="text-sm text-gray-300 whitespace-pre-wrap">
              {activeProblem.description || 'No description provided.'}
            </p>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setOpenDescription(null)}
                className="px-4 py-2 text-sm rounded-md bg-black/60 border border-white/10 text-gray-300 hover:text-white hover:bg-black/80 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};