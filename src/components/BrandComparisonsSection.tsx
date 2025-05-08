// src/components/BrandComparisonsSection.tsx
import { GitCompareArrows } from "lucide-react";
import { SearchParams, Video } from "@/types/types";
import { BrandComparisonCard } from "./BrandComparisonCard";

interface BrandComparison {
  brandName: string;
  videos: Video[];
  searchParams: SearchParams;
}

interface BrandComparisonsSectionProps {
  comparisons: BrandComparison[];
  onRemove: (index: number) => void;
}

export function BrandComparisonsSection({
  comparisons,
  onRemove,
}: BrandComparisonsSectionProps) {
  if (comparisons.length === 0) return null;

  return (
    <div className="pt-4">
      {" "}
      {/* Added padding-top rather than margin for more consistent spacing */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <GitCompareArrows className="h-5 w-5 mr-2 text-primary" />
          Brand Comparisons
        </h2>
        <div className="text-sm text-muted-foreground">
          {comparisons.length} brand{comparisons.length !== 1 ? "s" : ""}{" "}
          compared
        </div>
      </div>
      <div className="space-y-6">
        {comparisons.map((comparison, index) => (
          <BrandComparisonCard
            key={index}
            index={index}
            brandName={comparison.brandName}
            videos={comparison.videos}
            searchParams={comparison.searchParams}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>
    </div>
  );
}
