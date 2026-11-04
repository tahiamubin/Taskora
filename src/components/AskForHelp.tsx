"use client";

import { Label } from "@heroui/react";
import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { createHelp } from "../lib/actions/help";
import { authClient } from "../lib/auth-client";
import { toast } from "react-toastify";

type AskForHelpFormData = {
  title: string;
  questionLink: string;
  bug: string;
  tried: string;
  expected: string;
  userId: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease },
  },
};

const AskForHelp = () => {
  const { data: session } = authClient.useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reduce = useReducedMotion();
  const t = (v: any) => (reduce ? {} : v);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as AskForHelpFormData;

    if (!session?.user.id) {
      toast.error("You must be logged in to ask for help.");
      return;
    }

    const helpData = { ...data, userId: session.user.id };

    setIsSubmitting(true);
    try {
      await createHelp(helpData);
      toast.success("Help post submitted successfully!");
      form.reset();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to submit your request."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden  px-4 py-10">
      {/* Ambient Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <motion.div
        initial={t({ opacity: 0, y: 30, scale: 0.98 })}
        animate={t({ opacity: 1, y: 0, scale: 1 })}
        transition={{ duration: 0.6, ease }}
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 shadow-[0_20px_70px_-10px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:p-8"
      >
        {/* Decorative top gradient */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-500/10 to-transparent" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="relative mb-8"
        >
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Ask for Help
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Stuck on a problem? Share the details and get help from the
              community.
            </p>
          </motion.div>
        </motion.div>

        <motion.form
          id="ask-for-help-form"
          onSubmit={handleSubmit}
          variants={container}
          initial="hidden"
          animate="show"
          className="relative flex flex-col gap-6"
        >
          {/* Section 1: Problem Details */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5"
          >
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Problem Info
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title" className="text-gray-300">
                  Problem Title
                </Label>
                <input
                  id="title"
                  name="title"
                  required
                  placeholder="e.g. Two Sum"
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-blue-500/50 focus:bg-black/50 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="questionLink" className="text-gray-300">
                  Question Link
                </Label>
                <input
                  id="questionLink"
                  name="questionLink"
                  type="url"
                  required
                  placeholder="https://..."
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-blue-500/50 focus:bg-black/50 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </motion.div>

          {/* Section 2: The Issue */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5"
          >
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
              The Issue
            </h3>

            <div className="flex flex-col gap-2">
              <Label htmlFor="bug" className="text-gray-300">
                What exactly is the bug?
              </Label>
              <textarea
                id="bug"
                name="bug"
                required
                rows={3}
                placeholder="Describe the issue clearly..."
                className="w-full resize-y rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-blue-500/50 focus:bg-black/50 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="expected" className="text-gray-300">
                What did you expect to happen?
              </Label>
              <textarea
                id="expected"
                name="expected"
                required
                rows={3}
                placeholder="Describe the intended result..."
                className="w-full resize-y rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-blue-500/50 focus:bg-black/50 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </motion.div>

          {/* Section 3: Your Attempts */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-5"
          >
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Your Attempts
            </h3>

            <div className="flex flex-col gap-2">
              <Label htmlFor="tried" className="text-gray-300">
                What have you tried?
              </Label>
              <textarea
                id="tried"
                name="tried"
                required
                rows={3}
                placeholder="Share what you've already attempted..."
                className="w-full resize-y rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-blue-500/50 focus:bg-black/50 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
          >
            <motion.button
              type="reset"
              whileHover={t({ scale: 1.02 })}
              whileTap={t({ scale: 0.97 })}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white sm:w-auto"
            >
              Reset
            </motion.button>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={t({ scale: 1.02 })}
              whileTap={t({ scale: 0.97 })}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AskForHelp;