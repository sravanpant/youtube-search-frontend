// src/components/SearchForm/ExcludedChannelsInput.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Plus, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface ExcludedChannelsInputProps {
  values: string[];
  onChange: (values: string[]) => void;
}

export function ExcludedChannelsInput({ values, onChange }: ExcludedChannelsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddChannel = () => {
    if (inputValue.trim() && !values.includes(inputValue.trim())) {
      const newValues = [...values, inputValue.trim()];
      onChange(newValues);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddChannel();
    }
  };

  const handleRemoveChannel = (channel: string) => {
    onChange(values.filter(v => v !== channel));
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-sm font-medium flex items-center">
          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
          Exclude Channels
        </Label>
        <p className="text-xs text-muted-foreground mt-1">
          Videos from these channels will be filtered out of your search results.
        </p>
      </div>
      
      <div className="relative">
        <Input
          placeholder="Enter channel name to exclude"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-20"
        />
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="absolute right-1 top-1"
        >
          <Button 
            size="sm"
            variant="secondary"
            className="h-8 cursor-pointer"
            onClick={handleAddChannel}
            disabled={!inputValue.trim()}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add
          </Button>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {values.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-md border p-3"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium">Excluded Channels ({values.length})</span>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onChange([])}
                  className="h-6 text-xs hover:text-destructive"
                >
                  Clear All
                </Button>
              </motion.div>
            </div>
            
            <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto p-1">
              <AnimatePresence>
                {values.map((channel, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="px-2 py-1 gap-1"
                    >
                      {channel}
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveChannel(channel)}
                        className="h-4 w-4 p-0 rounded-full hover:bg-destructive/10 hover:text-destructive"
                        aria-label={`Remove ${channel}`}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}