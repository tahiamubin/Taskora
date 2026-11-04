"use client";

import { useState, type FormEvent } from "react";
import { Plus } from "@gravity-ui/icons";
import { Button, Label, Modal, useOverlayState } from "@heroui/react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

import { ContestFormData } from "../lib/types/contest";
import { createContest } from "../lib/actions/contest";
import { authClient } from "../lib/auth-client";

const ease = [0.22, 1, 0.36, 1] as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

export default function AddContestModal() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const state = useOverlayState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const reduce = useReducedMotion();
  const t = (v: any) => (reduce ? {} : v);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as ContestFormData;
    
    const contestData = {
      ...data,
      userId: session?.user.id,
    };

    setIsSubmitting(true);
    setError(null);

    try {
      await createContest(contestData);
      form.reset();
      state.close();
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. The problem link may already exist.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          whileHover={t({ scale: 1.05, y: -2 })}
          whileTap={t({ scale: 0.95 })}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Button
            onPress={state.open}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-6 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:border-blue-500/60 hover:bg-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
          >
            <Plus className="h-4 w-4 text-blue-400" aria-hidden="true" />
            Add Contest
          </Button>
        </motion.div>
      </div>

      <Modal>
        <Modal.Backdrop
          isOpen={state.isOpen}
          onOpenChange={(open) => {
            state.setOpen(open);
            if (!open) setError(null);
          }}
          className="bg-black/60 backdrop-blur-md"
        >
          <Modal.Container placement="auto">
            <Modal.Dialog className="relative w-full max-w-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#1a1c22]/95 to-[#0a0a0c]/95 text-white shadow-[0_20px_70px_-10px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
              {/* Decorative top glow */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-500/10 to-transparent" />
              
              <Modal.CloseTrigger className="transition-colors hover:bg-white/10" />

              <Modal.Header className="relative px-6 pb-4 pt-8 sm:px-8">
                <motion.div
                  initial={t({ scale: 0.8, opacity: 0 })}
                  animate={t({ scale: 1, opacity: 1 })}
                  transition={{ duration: 0.5, ease, delay: 0.1 }}
                >
                  <Modal.Icon className="bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30">
                    <Plus className="size-5" />
                  </Modal.Icon>
                </motion.div>

                <motion.div
                  initial={t({ opacity: 0, y: 10 })}
                  animate={t({ opacity: 1, y: 0 })}
                  transition={{ duration: 0.4, ease, delay: 0.15 }}
                >
                  <Modal.Heading className="mt-4 text-xl font-semibold tracking-tight text-white">
                    Add a Contest
                  </Modal.Heading>
                  <p className="mt-1.5 text-sm leading-5 text-gray-400">
                    Track your competitive programming performance and notes.
                  </p>
                </motion.div>
              </Modal.Header>

              <Modal.Body className="max-h-[65vh] overflow-y-auto px-6 py-2 sm:px-8 custom-scrollbar">
                <motion.form
                  id="add-contest-form"
                  onSubmit={handleSubmit}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-5 pb-4"
                >
                  {/* Group 1: Contest Details */}
                  <motion.div variants={fadeUp} className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-gray-500">Contest Details</h4>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="platform" className="text-gray-300">Platform Name</Label>
                        <input
                          id="platform"
                          name="platform"
                          required
                          placeholder="e.g. Codeforces"
                          className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-blue-500/50 focus:bg-black/50 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="contestName" className="text-gray-300">Contest Name</Label>
                        <input
                          id="contestName"
                          name="name"
                          required
                          placeholder="e.g. Round 892"
                          className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-blue-500/50 focus:bg-black/50 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="solutionLink" className="text-gray-300">Contest Link</Label>
                      <input
                        id="solutionLink"
                        name="solutionLink"
                        type="url"
                        required
                        placeholder="https://codeforces.com/contest/..."
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-blue-500/50 focus:bg-black/50 focus:ring-2 focus:ring-blue-500/20"
                      />
                      <p className="text-[11px] text-gray-500">
                        Each contest link must be unique.
                      </p>
                    </div>
                  </motion.div>

                  {/* Group 2: Performance */}
                  <motion.div variants={fadeUp} className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-gray-500">Performance</h4>
                    
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="contestDate" className="text-gray-300">Date</Label>
                        <input
                          id="contestDate"
                          name="contestDate"
                          type="date"
                          required
                          className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none transition-all focus:border-blue-500/50 focus:bg-black/50 focus:ring-2 focus:ring-blue-500/20 [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="problemSolved" className="text-gray-300">Solved</Label>
                        <input
                          id="problemSolved"
                          name="problemSolved"
                          type="number"
                          required
                          placeholder="0"
                          className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-blue-500/50 focus:bg-black/50 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="rank" className="text-gray-300">Rank</Label>
                        <input
                          id="rank"
                          name="rank"
                          type="number"
                          required
                          placeholder="1"
                          className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-blue-500/50 focus:bg-black/50 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label htmlFor="participants" className="text-gray-300">Total</Label>
                        <input
                          id="participants"
                          name="participants"
                          type="number"
                          required
                          placeholder="5000"
                          className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-blue-500/50 focus:bg-black/50 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Group 3: Notes */}
                  <motion.div variants={fadeUp} className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="description" className="text-gray-300">What did you learn?</Label>
                      <textarea
                        id="description"
                        name="description"
                        required
                        rows={3}
                        placeholder="Explain your approach, the algorithms you used, or what went wrong..."
                        className="w-full resize-y rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition-all focus:border-blue-500/50 focus:bg-black/50 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </motion.div>

                  {error && (
                    <motion.p
                      initial={t({ opacity: 0, height: 0 })}
                      animate={t({ opacity: 1, height: "auto" })}
                      role="alert"
                      className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400"
                    >
                      {error}
                    </motion.p>
                  )}
                </motion.form>
              </Modal.Body>

              <Modal.Footer className="border-t border-white/10 px-6 py-5 sm:px-8">
                <Button
                  slot="close"
                  variant="secondary"
                  className="rounded-xl border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  form="add-contest-form"
                  isPending={isSubmitting}
                  className="rounded-xl bg-blue-500 font-medium text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:bg-blue-400 focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-[#101010]"
                >
                  {isSubmitting ? "Saving..." : "Add Contest"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}