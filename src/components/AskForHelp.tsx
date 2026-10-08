"use client";
import { Label } from "@heroui/react";
import React from "react";
import { createHelp } from "../lib/actions/help";

const AskForHelp = () => {
  type AskForHelpFormData = {
    title: string;
    questionLink: string;
    bug: string;
    tried: string;
    expected: string;
  };
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as AskForHelpFormData;
    //console.log(data);
    await createHelp(data)

  };

  return (
    <div className="flex min-h-screen items-center justify-center  px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#18181b] p-6 shadow-xl sm:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">Ask for Help</h2>
          <p className="mt-1 text-sm text-gray-400">
            Stuck on a problem? Share the details and get help from the
            community.
          </p>
        </div>

        <form
          id="ask-for-help-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="title" className="text-gray-200">
              Problem Title
            </Label>
            <input
              id="title"
              name="title"
              required
              placeholder="e.g. Two Sum"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="questionLink" className="text-gray-200">
              Question Link
            </Label>
            <input
              id="questionLink"
              name="questionLink"
              type="url"
              required
              placeholder="https://..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="bug" className="text-gray-200">
              What exactly is the bug?
            </Label>
            <textarea
              id="bug"
              name="bug"
              required
              rows={4}
              placeholder="Describe the issue clearly..."
              className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tried" className="text-gray-200">
              What have you tried?
            </Label>
            <textarea
              id="tried"
              name="tried"
              required
              rows={4}
              placeholder="Share what you've already attempted..."
              className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/10"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="expected" className="text-gray-200">
              What did you expect to happen?
            </Label>
            <textarea
              id="expected"
              name="expected"
              required
              rows={4}
              placeholder="Describe the intended result..."
              className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-white/30 focus:bg-white/10"
            />
          </div>

          <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="reset"
              className="w-full rounded-xl border border-white/10 bg-transparent px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 sm:w-auto"
            >
              Reset
            </button>
            <button
              type="submit"
              className="w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 active:scale-[0.98] sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskForHelp;
