// frontend/src/components/SearchForm/FiltersToggleButton.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

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
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          variant="outline"
          type="button"
          onClick={onClick}
          className="w-full lg:w-auto h-11 cursor-pointer flex items-center justify-center gap-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {filterCount > 0 && (
            <Badge className="ml-1 bg-primary text-primary-foreground">
              {filterCount}
            </Badge>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
}
