"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "@gravity-ui/icons";
import { Button, Label, Modal, useOverlayState } from "@heroui/react";

import type { PlanFormValues } from "../lib/types/interview-prep";

import { updateInterview } from "../lib/actions/interview-prep";
import IconButton from "./Iconbutton";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/30";

export default function EditPrepPlanButton({ plan }: { plan: PlanFormValues }) {
  const router = useRouter();
  const state = useOverlayState();
  const formId = useId();

  const [error, setError] = useState<string | null>(null);

  const handleOpenChange = (open: boolean) => {
    state.setOpen(open);
    if (!open) setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as unknown as PlanFormValues;
    await updateInterview(plan._id, data);
    router.refresh();
  };

  return (
    <>
      <IconButton label="Edit plan" onClick={state.open}>
        <Pencil className="h-4 w-4" />
      </IconButton>

      <Modal>
        <Modal.Backdrop
          isOpen={state.isOpen}
          onOpenChange={handleOpenChange}
          className="bg-black/70 backdrop-blur-sm"
        >
          <Modal.Container placement="auto">
            <Modal.Dialog className="relative w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#2b2e35] via-[#17181b] to-[#101010] text-white shadow-2xl">
              <Modal.CloseTrigger />

              <Modal.Header className="px-6 pb-4 pt-8 sm:px-8">
                <Modal.Icon className="bg-white/10 text-white">
                  <Pencil className="size-5" />
                </Modal.Icon>
                <Modal.Heading className="text-xl font-semibold text-white">
                  Edit Prep Plan
                </Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-gray-400">
                  Update the details of this interview plan.
                </p>
              </Modal.Header>

              <Modal.Body className="max-h-[65vh] overflow-y-auto px-6 py-4 sm:px-8">
                <form
                  id={formId}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor={`${formId}-title`}
                      className="text-gray-200"
                    >
                      Plan Title
                    </Label>
                    <input
                      id={`${formId}-title`}
                      name="title"
                      required
                      defaultValue={plan.title}
                      placeholder="e.g. Frontend Engineer Interview"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor={`${formId}-company`}
                      className="text-gray-200"
                    >
                      Company
                    </Label>
                    <input
                      id={`${formId}-company`}
                      name="company"
                      required
                      defaultValue={plan.company}
                      placeholder="e.g. Google"
                      className={inputClass}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor={`${formId}-date`} className="text-gray-200">
                      Target Date
                    </Label>
                    <input
                      id={`${formId}-date`}
                      name="targetDate"
                      type="date"
                      required
                      defaultValue={plan.targetDate?.slice(0, 10)}
                      className={`${inputClass} [color-scheme:dark]`}
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
                  form={formId}
                  className="bg-white font-medium text-black hover:bg-gray-200"
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
