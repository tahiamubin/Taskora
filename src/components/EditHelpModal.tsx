"use client";

import React, { useCallback, useId, useMemo, useState } from "react";
import { Button, Input, Label, Modal, TextArea, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { Help } from "@/src/lib/types/help";
import { updateSharedHelp } from "../lib/actions/help";

type EditableFields = Pick<Help, "title" | "bug" | "tried" | "expected" | "questionLink">;

interface EditHelpModalProps {
  help: Help;
}

interface FieldConfig {
  name: keyof EditableFields;
  label: string;
  placeholder: string;
  multiline?: boolean;
  type?: "text" | "url";
}

const FIELDS: readonly FieldConfig[] = [
  { name: "title", label: "// title", placeholder: "Short, descriptive title" },
  { name: "bug", label: "// bug", placeholder: "What is going wrong?", multiline: true },
  { name: "tried", label: "// tried", placeholder: "What have you already tried?", multiline: true },
  { name: "expected", label: "// expected", placeholder: "What should happen instead?", multiline: true },
  { name: "questionLink", label: "// link", placeholder: "https://...", type: "url" },
];

const labelClass = "font-mono text-[10px] uppercase tracking-wider text-white/40";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] text-sm text-white " +
  "placeholder:text-white/30 transition-colors hover:border-white/20 " +
  "focus:border-blue-500/50 focus:bg-blue-500/[0.04]";

const toFormState = (help: Help): EditableFields => ({
  title: help.title,
  bug: help.bug,
  tried: help.tried,
  expected: help.expected,
  questionLink: help.questionLink,
});

const isValidUrl = (value: string): boolean => {
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
};

const EditHelpModal: React.FC<EditHelpModalProps> = ({ help }) => {
  const router = useRouter();
  const formId = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<EditableFields>(() => toFormState(help));

  const initial = useMemo(() => toFormState(help), [help]);

  const isDirty = useMemo(
    () => FIELDS.some(({ name }) => form[name].trim() !== initial[name].trim()),
    [form, initial]
  );

  const linkError = form.questionLink.trim() !== "" && !isValidUrl(form.questionLink.trim());
  const hasEmptyRequired = FIELDS.some(({ name }) => form[name].trim() === "");
  const canSubmit = isDirty && !hasEmptyRequired && !linkError && !isSaving;

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (isSaving) return; // don't allow dismissing mid-request
      if (open) setForm(toFormState(help)); // always start from the latest server data
      setIsOpen(open);
    },
    [help, isSaving]
  );

  const handleChange = useCallback(
    (name: keyof EditableFields) => (value: string) =>
      setForm((prev) => ({ ...prev, [name]: value })),
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    const payload: EditableFields = {
      title: form.title.trim(),
      bug: form.bug.trim(),
      tried: form.tried.trim(),
      expected: form.expected.trim(),
      questionLink: form.questionLink.trim(),
    };

    try {
      setIsSaving(true);
      await updateSharedHelp(help._id, payload);
      toast.success("Help request updated successfully!");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to update help request:", error);
      toast.error("Failed to update help request. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal>
      <Button
        onPress={() => handleOpenChange(true)}
        className="h-auto min-w-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-white/70 transition-colors hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300"
      >
        edit
      </Button>

      <Modal.Backdrop isOpen={isOpen} onOpenChange={handleOpenChange}>
        <Modal.Container placement="auto">
          <Modal.Dialog className="rounded-2xl border border-white/10 bg-[#18181b] shadow-xl sm:max-w-lg">
            <Modal.CloseTrigger className="text-white/50 hover:text-white" />

            <Modal.Header>
              <Modal.Icon className="border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                  aria-hidden="true"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </Modal.Icon>
              <Modal.Heading className="text-lg font-semibold text-white">
                Edit help request
              </Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-white/50">
                Update the details below and save your changes.
              </p>
            </Modal.Header>

            <Modal.Body className="px-6 pb-2">
              <form
                id={formId}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4"
              >
                {FIELDS.map(({ name, label, placeholder, multiline, type }) => {
                  const isLink = name === "questionLink";
                  return (
                    <TextField
                      key={name}
                      name={name}
                      type={type}
                      value={form[name]}
                      onChange={handleChange(name)}
                      isRequired
                      isDisabled={isSaving}
                      isInvalid={isLink && linkError}
                      className="flex w-full flex-col gap-1.5"
                    >
                      <Label className={labelClass}>{label}</Label>
                      {multiline ? (
                        <TextArea
                          rows={3}
                          placeholder={placeholder}
                          className={`${inputClass} resize-none leading-relaxed`}
                        />
                      ) : (
                        <Input
                          placeholder={placeholder}
                          className={`${inputClass} ${isLink ? "font-mono text-xs" : ""}`}
                        />
                      )}
                      {isLink && linkError && (
                        <p className="font-mono text-[10px] text-red-400">
                          Enter a valid http(s) URL.
                        </p>
                      )}
                    </TextField>
                  );
                })}
              </form>
            </Modal.Body>

            <Modal.Footer className="border-t border-white/5 pt-4">
              <Button
                variant="secondary"
                isDisabled={isSaving}
                onPress={() => handleOpenChange(false)}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs text-white/70 hover:border-white/20 hover:text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form={formId}
                isDisabled={!canSubmit}
                className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 text-xs font-medium text-blue-300 transition-colors hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSaving ? "Saving..." : "Save changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditHelpModal;