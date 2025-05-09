// src/components/SearchForm/MaxResultsWarning.tsx
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MaxResultsWarningProps {
  visible: boolean;
  value: number;
}

export function MaxResultsWarning({ visible, value }: MaxResultsWarningProps) {
  // Determine the warning level based on the value
  const getWarningLevel = () => {
    if (value >= 500) return "extreme";
    if (value >= 200) return "high";
    if (value > 50) return "medium";
    return "none";
  };

  const warningLevel = getWarningLevel();

  // Animation variants
  const variants = {
    hidden: { opacity: 0, height: 0, marginBottom: 0 },
    visible: { opacity: 1, height: "auto", marginBottom: 16 },
    exit: { opacity: 0, height: 0, marginBottom: 0 },
  };

  // Define colors and messages based on warning level
  const getWarningContent = () => {
    switch (warningLevel) {
      case "extreme":
        return {
          title: "Extreme resource request",
          message: `Retrieving ${value} results requires minimum of 5 different variations of the brand name (separated by commas) in the search field and can take over 150 seconds. This consumes extremely high amount of resources. Consider using a much smaller result set.`,
          bgClass: "bg-red-100 dark:bg-red-950/40",
          borderClass: "border-red-300 dark:border-red-700",
          titleClass: "text-red-900 dark:text-red-300",
          textClass: "text-red-800 dark:text-red-200",
          iconClass: "text-red-700 dark:text-red-300",
        };
      case "high":
        return {
          title: "High resource request",
          message: `Retrieving ${value} results requires minimum of 3 different variations of the brand name (separated by commas) in the search field and can take 100+ seconds. This consumes significant resources. Consider using a smaller number or ensure your search is very specific.`,
          bgClass: "bg-red-50 dark:bg-red-950/30",
          borderClass: "border-red-200 dark:border-red-800",
          titleClass: "text-red-800 dark:text-red-400",
          textClass: "text-red-700 dark:text-red-300",
          iconClass: "text-red-600 dark:text-red-400",
        };
      case "medium":
        return {
          title: "Large result set requested",
          message: `For ${value} results, add at least 2 different variations of the brand name (separated by commas) in the search field to increase search coverage and relevance.`,
          bgClass: "bg-amber-50 dark:bg-amber-950/30",
          borderClass: "border-amber-200 dark:border-amber-800",
          titleClass: "text-amber-800 dark:text-amber-400",
          textClass: "text-amber-700 dark:text-amber-300",
          iconClass: "text-amber-600 dark:text-amber-400",
        };
      default:
        return {
          title: "",
          message: "",
          bgClass: "",
          borderClass: "",
          titleClass: "",
          textClass: "",
          iconClass: "",
        };
    }
  };

  const {
    title,
    message,
    bgClass,
    borderClass,
    titleClass,
    textClass,
    iconClass,
  } = getWarningContent();

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={`max-results-${warningLevel}-${value}`} // Key changes force remount when level changes
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <Alert
            variant="destructive"
            className={cn(
              "border transition-colors duration-300",
              bgClass,
              borderClass
            )}
          >
            <AlertCircle className={cn("h-4 w-4", iconClass)} />
            <AlertTitle className={cn("text-sm font-medium", titleClass)}>
              {title}
            </AlertTitle>
            <AlertDescription className={cn("text-xs mt-1", textClass)}>
              {message}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}