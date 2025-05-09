// frontend/src/components/SearchForm/DateRangeSelector.tsx
import { Calendar } from "lucide-react";
import { DateFilterOption } from "@/types/enums";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateRangeSelectorProps {
  value: DateFilterOption;
  onChange: (value: DateFilterOption) => void;
}

export function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor="date_filter"
        className="text-sm font-medium flex items-center"
      >
        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
        Date Filter
      </Label>
      <Select
        value={value || DateFilterOption.ALL_TIME}
        onValueChange={(value) => onChange(value as DateFilterOption)}
      >
        <SelectTrigger className="w-full h-10 bg-background border-input focus:ring-0 focus:ring-offset-0">
          <SelectValue placeholder="Filter by date" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-xs text-muted-foreground">
              Recent
            </SelectLabel>
            <SelectItem value={DateFilterOption.PAST_HOUR}>
              Past Hour
            </SelectItem>
            <SelectItem value={DateFilterOption.PAST_24_HOURS}>
              Past 24 Hours
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel className="text-xs text-muted-foreground">
              Longer Periods
            </SelectLabel>
            <SelectItem value={DateFilterOption.PAST_7_DAYS}>
              Past 7 Days
            </SelectItem>
            <SelectItem value={DateFilterOption.PAST_30_DAYS}>
              Past 30 Days
            </SelectItem>
            <SelectItem value={DateFilterOption.PAST_90_DAYS}>
              Past 90 Days
            </SelectItem>
            <SelectItem value={DateFilterOption.ALL_TIME}>
              All Time
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel className="text-xs text-muted-foreground">
              Advanced
            </SelectLabel>
            <SelectItem value={DateFilterOption.CUSTOM}>
              Custom Range
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}