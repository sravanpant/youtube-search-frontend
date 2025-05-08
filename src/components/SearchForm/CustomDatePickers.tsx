// frontend/src/components/SearchForm/CustomDatePickers.tsx
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

interface CustomDatePickersProps {
  fromDate?: Date;
  toDate?: Date;
  onFromDateChange: (date?: Date) => void;
  onToDateChange: (date?: Date) => void;
}

export function CustomDatePickers({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}: CustomDatePickersProps) {
  return (
    <>
      {/* From Date */}
      <div className="space-y-1.5">
        <Label
          htmlFor="custom_date_from"
          className="text-sm font-medium flex items-center"
        >
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          From Date
        </Label>
        <DatePicker
          id="custom_date_from"
          onChange={onFromDateChange}
          className="h-10 bg-background border-input focus:ring-0 focus:ring-offset-0"
        />
        {fromDate && (
          <p className="text-xs text-muted-foreground mt-1">
            Selected: {fromDate.toLocaleDateString()}
          </p>
        )}
      </div>

      {/* To Date */}
      <div className="space-y-1.5">
        <Label
          htmlFor="custom_date_to"
          className="text-sm font-medium flex items-center"
        >
          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
          To Date
        </Label>
        <DatePicker
          id="custom_date_to"
          onChange={onToDateChange}
          className="h-10 bg-background border-input focus:ring-0 focus:ring-offset-0"
        />
        {toDate && (
          <p className="text-xs text-muted-foreground mt-1">
            Selected: {toDate.toLocaleDateString()}
          </p>
        )}
      </div>
    </>
  );
}