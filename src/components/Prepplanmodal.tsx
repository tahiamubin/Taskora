"use client";

import type { FormEvent } from "react";
import { Pencil, Plus } from "@gravity-ui/icons";
import { Button, Label, Modal, useOverlayState } from "@heroui/react";
import { PlanFormValues, PrepPlan } from "../lib/types/Prep";


type OverlayState = ReturnType<typeof useOverlayState>;

interface PrepPlanModalProps {
  state: OverlayState;
  /** When provided, the modal edits this plan instead of creating a new one. */
  plan?: PrepPlan;
  onSubmit: (values: PlanFormValues) => void;
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/30";

export default function PrepPlanModal({
  state,
  plan,
  onSubmit,
}: PrepPlanModalProps) {
  const isEditing = Boolean(plan);
  const Icon = isEditing ? Pencil : Plus;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onSubmit({
      title: String(formData.get("title")).trim(),
      company: String(formData.get("company")).trim(),
      targetDate: String(formData.get("targetDate")),
    });
    state.close();
  };

  return (
    <Modal>
      <Modal.Backdrop
        isOpen={state.isOpen}
        onOpenChange={state.setOpen}
        className="bg-black/70 backdrop-blur-sm"
      >
        <Modal.Container placement="auto">
          <Modal.Dialog className="relative w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#2b2e35] via-[#17181b] to-[#101010] text-white shadow-2xl">
            <Modal.CloseTrigger />

            <Modal.Header className="px-6 pb-4 pt-8 sm:px-8">
              <Modal.Icon className="bg-white/10 text-white">
                <Icon className="size-5" />
              </Modal.Icon>

              <Modal.Heading className="text-xl font-semibold text-white">
                {isEditing ? "Edit Prep Plan" : "Create a Prep Plan"}
              </Modal.Heading>

              <p className="mt-1.5 text-sm leading-5 text-gray-400">
                {isEditing
                  ? "Update the details of this interview plan."
                  : "Set a target date, then break your prep into topics."}
              </p>
            </Modal.Header>

            <Modal.Body className="max-h-[65vh] overflow-y-auto px-6 py-4 sm:px-8">
              <form
                key={plan?.id ?? "new"}
                id="prep-plan-form"
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
                    defaultValue={plan?.title}
                    placeholder="e.g. Frontend Engineer Interview"
                    className={inputClass}
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
                    defaultValue={plan?.company}
                    placeholder="e.g. Google"
                    className={inputClass}
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
                    defaultValue={plan?.targetDate}
                    className={`${inputClass} [color-scheme:dark]`}
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
                form="prep-plan-form"
                className="bg-white font-medium text-black hover:bg-gray-200"
              >
                {isEditing ? "Save Changes" : "Create Plan"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}