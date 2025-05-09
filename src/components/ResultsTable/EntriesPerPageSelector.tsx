// frontend/src/components/ResultsTable/EntriesPerPageSelector.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EntriesPerPageSelectorProps {
  entriesPerPage: number;
  onEntriesChange: (value: string) => void;
}

export const EntriesPerPageSelector = ({
  entriesPerPage,
  onEntriesChange,
}: EntriesPerPageSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-foreground font-medium">Show</span>
      <Select
        value={entriesPerPage.toString()}
        onValueChange={onEntriesChange}
      >
        <SelectTrigger className="w-[100px] border-input">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {[10, 25, 50, 100].map((number) => (
            <SelectItem key={number} value={number.toString()}>
              {number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-sm text-foreground">entries</span>
    </div>
  );
};