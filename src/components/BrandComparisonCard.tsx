// src/components/BrandComparisonCard.tsx
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import { SearchParams, Video } from "@/types/types";
import ResultsTable from "@/components/ResultsTable";
import { motion, AnimatePresence } from "framer-motion";

interface BrandComparisonCardProps {
  brandName: string;
  videos: Video[];
  searchParams: SearchParams;
  onRemove: () => void;
  index: number;
}

export function BrandComparisonCard({
  brandName,
  videos,
  searchParams,
  onRemove,
  index,
}: BrandComparisonCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="shadow-sm border-border/80 overflow-hidden">
        <CardHeader className="bg-muted/30 py-3 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={toggleOpen}
                >
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
              <div>
                <CardTitle className="text-lg">{brandName}</CardTitle>
                <CardDescription className="text-xs">
                  {videos.length} videos • Min. views: {searchParams.min_views.toLocaleString()}
                </CardDescription>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive/80"
                onClick={onRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </CardHeader>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={contentVariants}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="w-full overflow-auto p-5">
                  <ResultsTable
                    videos={videos}
                    searchParams={searchParams}
                    isLoading={false}
                  />
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}