// frontend/src/components/SearchForm/MaxResultsSelector.tsx
import { BarChart2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MaxResultsSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function MaxResultsSelector({ value, onChange }: MaxResultsSelectorProps) {
  const maxResultsOptions = [10, 20, 30, 50, 100, 200, 500];
  
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor="max_results"
        className="text-sm font-medium flex items-center"
      >
        <BarChart2 className="h-4 w-4 mr-2 text-muted-foreground" />
        Maximum Results
      </Label>
      <Select
        value={value.toString()}
        onValueChange={(value) => onChange(parseInt(value))}
      >
        <SelectTrigger className="w-full h-10 bg-background border-input focus:ring-0 focus:ring-offset-0">
          <SelectValue placeholder="Select max results" />
        </SelectTrigger>
        <SelectContent>
          {maxResultsOptions.map((num) => (
            <SelectItem key={num} value={num.toString()}>
              {num} videos
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}