// src/components/SearchForm/CompareButton.tsx
import { Button } from "@/components/ui/button";
import { GitCompareArrows } from "lucide-react";

interface CompareButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function CompareButton({
  onClick,
  disabled,
}: CompareButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="gap-2 min-w-[160px] h-11" // Increased button width
      disabled={disabled}
    >
      <GitCompareArrows className="h-4 w-4" />
      Compare Brands
    </Button>
  );
}