// frontend/src/components/SearchForm/FiltersToggleButton.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, ChevronDown } from "lucide-react";

interface FiltersToggleButtonProps {
  isOpen: boolean;
  filterCount: number;
  onClick: () => void;
}

export function FiltersToggleButton({
  isOpen,
  filterCount,
  onClick,
}: FiltersToggleButtonProps) {
  return (
    <div className="lg:self-end">
      <Button
        variant="outline"
        type="button"
        onClick={onClick}
        className="w-full lg:w-auto h-11 flex items-center justify-center gap-2"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
        {filterCount > 0 && (
          <Badge className="ml-1 bg-primary text-primary-foreground">
            {filterCount}
          </Badge>
        )}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>
    </div>
  );
}