import type { ReactNode } from "react";
import { Button } from "@heroui/react";

interface IconButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
  children: ReactNode;
}

export default function IconButton({
  label,
  onClick,
  disabled,
  danger,
  children,
}: IconButtonProps) {
  return (
    <Button
      isIconOnly
      size="sm"
      variant="ghost"
      aria-label={label}
      onPress={onClick}
      isDisabled={disabled}
      className={`rounded-full text-white/50 ${
        danger ? "hover:text-red-400" : "hover:text-white"
      }`}
    >
      {children}
    </Button>
  );
}