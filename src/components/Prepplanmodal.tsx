"use client";

import { Plus } from "@gravity-ui/icons";
import { Button, Label, Modal, useOverlayState } from "@heroui/react";
import { useRouter } from "next/navigation";

import { createInterviewPrep } from "../lib/actions/interview-prep";
import { PlanFormValues } from "../lib/types/interview-prep";
import { FormEvent } from "react";
import { authClient } from "../lib/auth-client";


export default function AddPrepPlanModal() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const state = useOverlayState();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as PlanFormValues;
    //console.log(data);
    const helpData = {
      ...data,
      userId: session?.user.id,
    } as PlanFormValues;


    await createInterviewPrep(helpData);
    form.reset();
    state.close();
    router.refresh();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onPress={state.open}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-white/[0.08] px-5 text-sm font-medium text-white transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
        >
          <Plus className="h-4 w-4 text-blue-400" aria-hidden="true" />
          Create Plan
        </Button>
      </div>

      <Modal>
        <Modal.Backdrop
          isOpen={state.isOpen}
          onOpenChange={(open) => {
            state.setOpen(open);
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
                  Create a Prep Plan
                </Modal.Heading>

                <p className="mt-1.5 text-sm leading-5 text-gray-400">
                  Set a target date, then break your prep into topics.
                </p>
              </Modal.Header>

              <Modal.Body className="max-h-[65vh] overflow-y-auto px-6 py-4 sm:px-8">
                <form
                  id="add-prep-plan-form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="title" className="text-gray-200">
                      Plan Title
                    </Label>
                    <input
                      id="title"
                      name="title"
                      required
                      placeholder="e.g. Frontend Engineer Interview"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/30"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="company" className="text-gray-200">
                      Company
                    </Label>
                    <input
                      id="company"
                      name="company"
                      required
                      placeholder="e.g. Google"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/30"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="targetDate" className="text-gray-200">
                      Target Date
                    </Label>
                    <input
                      id="targetDate"
                      name="targetDate"
                      type="date"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/30 [color-scheme:dark]"
                    />
                  </div>
                </form>
              </Modal.Body>

              <Modal.Footer className="border-t border-white/10 px-6 py-5 sm:px-8">
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>

                <Button
                  type="submit"
                  form="add-prep-plan-form"
                  className="bg-white font-medium text-black hover:bg-gray-200"
                >
                  Create Plan
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

    
    </>
  );
}
