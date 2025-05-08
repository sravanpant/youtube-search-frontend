// src/components/ComparisonEmptyCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { GitCompareArrows } from "lucide-react";

export function ComparisonEmptyCard() {
  return (
    <Card className="shadow-sm border-border/80 mb-10">
      <CardContent className="px-6 py-10 flex flex-col items-center justify-center text-center">
        <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mb-4">
          <GitCompareArrows className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium">Ready to Compare Another Brand</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          Enter a new brand name in the search field above while keeping your current filters.
          Click &quot;Search Videos&quot; to see results and compare with previous brands.
        </p>
      </CardContent>
    </Card>
  );
}

