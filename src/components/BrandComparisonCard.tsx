// src/components/BrandComparisonCard.tsx
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { SearchParams, Video } from "@/types/types";
import ResultsTable from "@/components/ResultsTable";

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
//   index,
}: BrandComparisonCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Card className="shadow-sm border-border/80 overflow-hidden">
      <CardHeader className="bg-muted/30 py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleOpen}
            >
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
            <div>
              <CardTitle className="text-lg">{brandName}</CardTitle>
              <CardDescription className="text-xs">
                {videos.length} videos • Min. views: {searchParams.min_views.toLocaleString()}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive/80"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      {isOpen && (
        <CardContent className="p-0">
          <div className="w-full overflow-auto p-5">
            <ResultsTable
              videos={videos}
              searchParams={searchParams}
              isLoading={false}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}