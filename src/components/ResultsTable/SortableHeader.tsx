// frontend/src/components/ResultsTable/SortableHeader.tsx
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { SortField, SortOrder } from "@/types/types";

interface SortableHeaderProps {
  field: SortField;
  label: string;
  currentSort: SortField | null;
  currentOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export const SortableHeader = ({
  field,
  label,
  currentSort,
  currentOrder,
  onSort,
}: SortableHeaderProps) => {
  return (
    <th className="px-4 py-3">
      <Button
        variant="ghost"
        onClick={() => onSort(field)}
        className="hover:bg-muted/60 h-8 w-full flex items-center justify-start gap-1"
      >
        {label}
        {currentSort === field ? (
          currentOrder === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )
        ) : (
          <ArrowUpDown className="h-4 w-4 opacity-50" />
        )}
      </Button>
    </th>
  );
};