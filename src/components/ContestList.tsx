"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteContest, editContest } from "../lib/actions/contest";

interface Contest {
  _id: string;
  contestDate: string;
  description: string;
  name: string;
  platform: string;
  problemSolved: number;
  solutionLink: string;
}

interface ContestListProps {
  contest: Contest[];
  onUpdate?: (updatedContest: Contest) => void;
  onDelete?: (id: string) => void;
}

const emptyForm: Contest = {
  _id: "",
  contestDate: "",
  description: "",
  name: "",
  platform: "",
  problemSolved: 0,
  solutionLink: "",
};

const inputClass =
  "bg-black/60 border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30";

const gridCols = "grid grid-cols-[2fr_1.2fr_1.2fr_1fr_1fr_1fr_1.5fr] gap-4";

const formatDate = (value: string) => {
  if (!value) return "-";
  const date = new Date(value);
  return isNaN(date.getTime()) ? value : date.toLocaleDateString();
};

// <input type="date"> needs YYYY-MM-DD
const toDateInputValue = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
};

export const ContestList: React.FC<ContestListProps> = ({
  contest,
  onUpdate,
  onDelete,
}) => {
  const router = useRouter();
  const [openDescription, setOpenDescription] = useState<string | null>(null);
  const [editContestItem, setEditContestItem] = useState<Contest | null>(null);
  const [formData, setFormData] = useState<Contest>(emptyForm);

  const activeContest = contest.find((c) => c._id === openDescription);

  const handleEditClick = (item: Contest) => {
    setEditContestItem(item);
    setFormData({ ...item, contestDate: toDateInputValue(item.contestDate) });
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "problemSolved" ? Number(value) || 0 : value,
    }));
  };

  const handleSave = async () => {
    try {
      const { _id, ...data } = formData;
      await editContest(data, _id);
      onUpdate?.(formData);
      setEditContestItem(null);
      router.refresh();
    } catch (error) {
      console.error("Failed to update contest:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContest(id);
      onDelete?.(id);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete contest:", error);
    }
  };

  return (
    <div className="w-full p-4">
      {/* Header */}
      <div
        className={`${gridCols} px-4 py-3 text-sm font-semibold text-gray-400 border-b border-white/10`}
      >
        <span>Name</span>
        <span>Platform</span>
        <span>Date</span>
        <span>Solved</span>
        <span>Description</span>
        <span>Solution</span>
        <span>Actions</span>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-2 mt-2">
        {contest.map((item) => (
          <div
            key={item._id}
            className={`${gridCols} items-center bg-[#111111] hover:bg-[#161616] transition-colors rounded-lg px-4 py-3 text-sm text-gray-200 border border-white/5`}
          >
            <span className="font-medium text-white truncate">{item.name}</span>

            <span className="text-gray-300 truncate">{item.platform}</span>

            <span className="text-gray-300">{formatDate(item.contestDate)}</span>

            <span className="text-gray-300">{item.problemSolved}</span>

            <button
              onClick={() => setOpenDescription(item._id)}
              className="px-2 py-1 text-xs rounded-md bg-black/60 border border-white/10 text-gray-300 hover:text-white hover:bg-black/80 transition-colors"
            >
              View
            </button>

            {item.solutionLink ? (
              <a
                href={item.solutionLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline truncate"
              >
                Link
              </a>
            ) : (
              <span className="text-gray-500">-</span>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handleEditClick(item)}
                className="px-3 py-1 text-xs rounded-md bg-black/60 border border-white/10 text-gray-300 hover:text-white hover:bg-black/80 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-3 py-1 text-xs rounded-md bg-black/60 border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Description Modal */}
      {activeContest && (
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
                {activeContest.name}
              </h2>
              <button
                onClick={() => setOpenDescription(null)}
                className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>

            <p className="text-sm text-gray-300 whitespace-pre-wrap">
              {activeContest.description || "No description provided."}
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

      {/* Edit Modal */}
      {editContestItem && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setEditContestItem(null)}
        >
          <div
            className="bg-[#111111] border border-white/10 rounded-xl max-w-lg w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Edit Contest</h2>
              <button
                onClick={() => setEditContestItem(null)}
                className="text-gray-500 hover:text-white transition-colors text-xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Platform</label>
                <input
                  type="text"
                  name="platform"
                  value={formData.platform}
                  onChange={handleFormChange}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400">Contest Date</label>
                  <input
                    type="date"
                    name="contestDate"
                    value={formData.contestDate}
                    onChange={handleFormChange}
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-400">
                    Problems Solved
                  </label>
                  <input
                    type="number"
                    min={0}
                    name="problemSolved"
                    value={formData.problemSolved}
                    onChange={handleFormChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Solution Link</label>
                <input
                  type="text"
                  name="solutionLink"
                  value={formData.solutionLink}
                  onChange={handleFormChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setEditContestItem(null)}
                className="px-4 py-2 text-sm rounded-md bg-black/60 border border-white/10 text-gray-300 hover:text-white hover:bg-black/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm rounded-md bg-white text-black font-medium hover:bg-gray-200 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};