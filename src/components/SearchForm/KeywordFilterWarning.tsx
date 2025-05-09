// src/components/SearchForm/KeywordFilterWarning.tsx (fixed)
import { FilterIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { KeywordFilterOption } from "@/types/enums";

interface KeywordFilterWarningProps {
  visible: boolean;
  filterType: KeywordFilterOption;
}

export function KeywordFilterWarning({ visible, filterType }: KeywordFilterWarningProps) {
  // Get the appropriate message based on filter type
  const getMessage = () => {
    switch (filterType) {
      case KeywordFilterOption.TITLE_ONLY:
        return "You're filtering to show only videos with the brand name in the title (not in description). This may significantly reduce the number of results.";
      case KeywordFilterOption.DESCRIPTION_ONLY:
        return "You're filtering to show only videos with the brand name in the description (not in title). This may significantly reduce the number of results.";
      case KeywordFilterOption.TITLE_AND_DESCRIPTION:
        return "You're filtering to show only videos with the brand name in both title and description. This will substantially reduce the number of results.";
      default:
        return "";
    }
  };
  
  // Animation variants for smooth transitions
  const variants = {
    hidden: { opacity: 0, height: 0, marginBottom: 0 },
    visible: { opacity: 1, height: "auto", marginBottom: 16 },
    exit: { opacity: 0, height: 0, marginBottom: 0 }
  };
  
  // Determine if the warning should be shown - only use this for the content, not for AnimatePresence
  const shouldShowWarning = visible && filterType !== KeywordFilterOption.ANY;
  
  return (
    <AnimatePresence>
      {/* The key prop is critical here to ensure proper remounting when filter type changes */}
      {shouldShowWarning && (
        <motion.div
          key={`keyword-filter-${filterType}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <Alert 
            variant="default" 
            className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
          >
            <FilterIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-400 text-sm font-medium">
              Keyword filter applied
            </AlertTitle>
            <AlertDescription className="text-blue-500 dark:text-blue-300 text-xs mt-1">
              {getMessage()}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}