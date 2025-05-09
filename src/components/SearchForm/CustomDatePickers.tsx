// src/components/SearchForm/CustomDatePickers.tsx
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { motion } from "framer-motion";

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
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <DatePicker
            id="custom_date_from"
            onChange={onFromDateChange}
            className="w-full"
          />
        </motion.div>
        {fromDate && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground mt-1"
          >
            Selected: {fromDate.toLocaleDateString()}
          </motion.p>
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
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <DatePicker
            id="custom_date_to"
            onChange={onToDateChange}
            className="w-full"
          />
        </motion.div>
        {toDate && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-muted-foreground mt-1"
          >
            Selected: {toDate.toLocaleDateString()}
          </motion.p>
        )}
      </div>
    </>
  );
}