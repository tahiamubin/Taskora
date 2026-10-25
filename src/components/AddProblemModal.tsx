"use client";

import { useState, type FormEvent } from "react";
import { Plus } from "@gravity-ui/icons";
import { Button, Label, Modal, useOverlayState } from "@heroui/react";
import { useRouter } from "next/navigation";
import { createProblemLog } from "../lib/actions/problem";
import { Problem } from "../lib/types/problem";
import { authClient } from "../lib/auth-client";

export default function AddProblemModal() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const state = useOverlayState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries()) as unknown as Problem;
    const problemData = {
      ...data,
      userId: session?.user.id,
    };

    setIsSubmitting(true);
    setError(null);

    try {
      await createProblemLog(problemData);
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
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onPress={state.open}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-white/[0.08] px-5 text-sm font-medium text-white transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
        >
          <Plus className="h-4 w-4 text-blue-400" aria-hidden="true" />
          Add Problem
        </Button>
      </div>

      <Modal>
        <Modal.Backdrop
          isOpen={state.isOpen}
          onOpenChange={(open) => {
            state.setOpen(open);
            if (!open) setError(null);
          }}
          className="bg-black/70 backdrop-blur-sm"
        >
          <Modal.Container placement="auto">
            <Modal.Dialog className="relative w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#2b2e35] via-[#17181b] to-[#101010] text-white shadow-2xl">
              <Modal.CloseTrigger />

              <Modal.Header className="px-6 pb-4 pt-8 sm:px-8">
                <Modal.Icon className="bg-white/10 text-white">
                  <Plus className="size-5" />
                </Modal.Icon>

                <Modal.Heading className="text-xl font-semibold text-white">
                  Add a Problem
                </Modal.Heading>

                <p className="mt-1.5 text-sm leading-5 text-gray-400">
                  Track your coding practice and document your solutions.
                </p>
              </Modal.Header>

              <Modal.Body className="max-h-[65vh] overflow-y-auto px-6 py-4 sm:px-8">
                <form
                  id="add-problem-form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="platform" className="text-gray-200">
                      Platform Name
                    </Label>
                    <input
                      id="platform"
                      name="platform"
                      required
                      placeholder="e.g. LeetCode, Codeforces"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/30"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name" className="text-gray-200">
                      Problem Name
                    </Label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Two Sum"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/30"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="difficulty" className="text-gray-200">
                      Difficulty Level
                    </Label>
                    <select
                      id="difficulty"
                      name="difficulty"
                      required
                      defaultValue=""
                      className="w-full rounded-xl border border-white/10 bg-[#222328] px-3 py-3 text-sm text-white outline-none focus:border-white/30"
                    >
                      <option value="" disabled>
                        Select difficulty
                      </option>
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="solutionLink" className="text-gray-200">
                      Problem / Solution Link
                    </Label>
                    <input
                      id="solutionLink"
                      name="solutionLink"
                      type="url"
                      required
                      placeholder="https://..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/30"
                    />
                    <p className="text-xs text-gray-500">
                      Each problem link must be unique.
                    </p>
                  </div>

                  <fieldset className="flex flex-col gap-3">
                    <legend className="text-sm font-medium text-gray-200">
                      Did you fail the first time?
                    </legend>

                    <div className="flex gap-5">
                      <label className="flex items-center gap-2 text-sm text-gray-300">
                        <input
                          type="radio"
                          name="attempted"
                          value="yes"
                          required
                          className="accent-white"
                        />
                        Yes
                      </label>

                      <label className="flex items-center gap-2 text-sm text-gray-300">
                        <input
                          type="radio"
                          name="attempted"
                          value="no"
                          className="accent-white"
                        />
                        No
                      </label>
                    </div>
                  </fieldset>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="concepts" className="text-gray-200">
                      Concepts
                    </Label>
                    <input
                      id="concepts"
                      name="concepts"
                      required
                      placeholder="Array, Hash Map, Two Pointers"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/30"
                    />
                    <p className="text-xs text-gray-500">
                      Separate concepts with commas.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="description" className="text-gray-200">
                      Solution Description
                    </Label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={4}
                      placeholder="Explain how you approached and solved the problem..."
                      className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/30"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-sm text-red-400">
                      {error}
                    </p>
                  )}
                </form>
              </Modal.Body>

              <Modal.Footer className="border-t border-white/10 px-6 py-5 sm:px-8">
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>

                <Button
                  type="submit"
                  form="add-problem-form"
                  isPending={isSubmitting}
                  className="bg-white font-medium text-black hover:bg-gray-200"
                >
                  Add Problem
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
