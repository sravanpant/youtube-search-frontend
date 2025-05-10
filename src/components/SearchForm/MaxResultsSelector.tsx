// frontend/src/components/SearchForm/MaxResultsSelector.tsx (enhanced)
import { BarChart2, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MaxResultsSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function MaxResultsSelector({
  value,
  onChange,
}: MaxResultsSelectorProps) {
  const maxResultsOptions = [10, 20, 30, 50, 100, 200, 300, 400, 500];
  const showWarningIndicator = value > 50;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label
          htmlFor="max_results"
          className="text-sm font-medium flex items-center"
        >
          <BarChart2 className="h-4 w-4 mr-2 text-muted-foreground" />
          Maximum Results
        </Label>

        {showWarningIndicator && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="cursor-help"
                >
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="right" className=" max-w-[260px]">
                <p className="text-xs text-red-300 dark:text-red-600">
                  For large result sets, consider adding multiple brand name
                  variations for more comprehensive results.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Select
          value={value.toString()}
          onValueChange={(value) => onChange(parseInt(value))}
        >
          <SelectTrigger
            className={cn(
              "w-full h-10 bg-background border-input",
              showWarningIndicator && "border-amber-300 dark:border-amber-700"
            )}
          >
            <SelectValue placeholder="Select max results" />
          </SelectTrigger>
          <SelectContent>
            {maxResultsOptions.map((num) => (
              <SelectItem
                key={num}
                value={num.toString()}
                className={num > 50 ? "text-amber-700 dark:text-amber-400" : ""}
              >
                {num > 50 ? `${num} videos (large set)` : `${num} videos`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    </div>
  );
}
