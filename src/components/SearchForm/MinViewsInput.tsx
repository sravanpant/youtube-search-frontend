// frontend/src/components/SearchForm/MinViewsInput.tsx
import { Eye } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface MinViewsInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function MinViewsInput({ value, onChange }: MinViewsInputProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor="min_views"
        className="text-sm font-medium flex items-center"
      >
        <Eye className="h-4 w-4 mr-2 text-muted-foreground" />
        Minimum Views
      </Label>
      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Input
          id="min_views"
          type="number"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          placeholder="Enter minimum views"
          className="h-9 bg-background border-input focus:ring-0 focus:ring-offset-0"
        />
      </motion.div>
    </div>
  );
}