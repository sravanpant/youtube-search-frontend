// src/components/SearchForm/KeywordFilterSelector.tsx
import React from "react";
import { Label } from "@/components/ui/label";
import { KeywordFilterOption } from "@/types/enums";
import { Search } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { motion } from "framer-motion";

interface KeywordFilterSelectorProps {
  value: KeywordFilterOption;
  onChange: (value: KeywordFilterOption) => void;
}

export function KeywordFilterSelector({ value, onChange }: KeywordFilterSelectorProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium flex items-center">
        <Search className="h-4 w-4 mr-2 text-muted-foreground" />
        Keyword Location
      </Label>
      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Select
          value={value}
          onValueChange={(val) => onChange(val as KeywordFilterOption)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Where keywords appear" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={KeywordFilterOption.ANY}>Any Location</SelectItem>
            <SelectItem value={KeywordFilterOption.TITLE_ONLY}>Title Only</SelectItem>
            <SelectItem value={KeywordFilterOption.DESCRIPTION_ONLY}>Description Only</SelectItem>
            <SelectItem value={KeywordFilterOption.TITLE_AND_DESCRIPTION}>Both Title & Description</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>
    </div>
  );
}