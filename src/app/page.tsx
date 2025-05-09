// src/app/page.tsx (modified version)
"use client";

import { useState, useEffect } from "react";
import SearchForm from "@/components/SearchForm";
import ResultsTable from "@/components/ResultsTable";
import { Video, SearchParams } from "@/types/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api, APIError } from "@/lib/api";
import { DateFilterOption } from "@/types/enums";
import { AlertTriangle, SearchCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComparisonEmptyCard } from "@/components/ComparisonEmptyCard";
import { BrandComparisonsSection } from "@/components/BrandComparisonsSection";
import { motion } from "framer-motion";

// Define a type for brand comparison
interface BrandComparison {
  brandName: string;
  videos: Video[];
  searchParams: SearchParams;
}

export default function Home() {
  const defaultSearchParams: SearchParams = {
    brand_name: "",
    max_results: 30,
    min_views: 1000,
    date_filter: DateFilterOption.ALL_TIME,
    custom_date_from: undefined,
    custom_date_to: undefined,
    country_code: "",
  };

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSearchParams, setLastSearchParams] =
    useState<SearchParams>(defaultSearchParams);

  // Brand comparison state
  const [comparisons, setComparisons] = useState<BrandComparison[]>([]);
  const [showEmptyCard, setShowEmptyCard] = useState(false);
  const [isCompareMode, setIsCompareMode] = useState(false);

  // When videos update, check if we should hide empty card
  useEffect(() => {
    if (videos.length > 0 && showEmptyCard) {
      setShowEmptyCard(false);
    }
  }, [showEmptyCard, videos]);

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    setLastSearchParams(params);

    try {
      const data = await api.search(params);
      setVideos(data);
    } catch (error) {
      const message =
        error instanceof APIError
          ? `Error: ${error.message}`
          : "Failed to fetch videos. Please try again later.";
      setError(message);
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle compare brands action
  const handleCompareBrands = () => {
    if (videos.length > 0 && lastSearchParams.brand_name) {
      // Add current results to comparisons
      setComparisons([
        ...comparisons,
        {
          brandName: lastSearchParams.brand_name,
          videos: [...videos],
          searchParams: { ...lastSearchParams },
        },
      ]);

      // Clear current results and prepare for new search
      setVideos([]);

      // Show empty card waiting for new search
      setShowEmptyCard(true);
      setIsCompareMode(true);

      // Update search params with empty brand name but keep all filters
      setLastSearchParams({
        ...lastSearchParams,
        brand_name: "",
      });
    }
  };

  // Remove a comparison
  const removeComparison = (index: number) => {
    setComparisons(comparisons.filter((_, i) => i !== index));
  };

  // Helper component for empty state when no search has been done
  const NoResultsCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-sm border-border/80">
        <CardContent className="px-6 py-10 flex flex-col items-center justify-center text-center">
          <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mb-4">
            <SearchCheck className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium">No Search Results Yet</h3>
          <p className="text-muted-foreground mt-2 max-w-md">
            Enter a brand name and configure your search parameters above to find
            YouTube videos mentioning your brand.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-muted/80 to-background border-b border-border/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                    Video Intelligence
                  </span>
                </h1>
                <p className="text-muted-foreground mt-1">
                  Discover and analyze brand mentions across YouTube&apos;s vast
                  content landscape
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 -mt-6">
          <Card className="shadow-md border-border/50 overflow-hidden">
            <CardContent className="p-6">
              <SearchForm
                onSearch={handleSearch}
                isLoading={loading}
                initialSearchParams={lastSearchParams}
                onCompare={handleCompareBrands}
                hasResults={videos.length > 0}
              />
            </CardContent>
          </Card>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive" className="border shadow-sm">
                <AlertTriangle className="h-4 w-4 mr-2" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          </div>
        )}

        {/* Results Section - Full width with appropriate padding */}
        <div className="px-4 sm:px-6 lg:px-8 mt-8 max-w-[1920px] mx-auto">
          {/* Current Search Results */}
          {videos.length > 0 ? (
            <motion.div 
              className="mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold flex items-center">
                    <SearchCheck className="h-5 w-5 mr-2 text-primary" />
                    Results for &quot;{lastSearchParams.brand_name}&quot;
                  </h2>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary border-0"
                  >
                    {videos.length} videos
                  </Badge>
                </div>
              </div>

              <Card className="shadow-sm border-border/80">
                <CardContent className="p-0">
                  <div className="w-full overflow-auto p-5">
                    <ResultsTable
                      videos={videos}
                      searchParams={lastSearchParams}
                      isLoading={loading}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : showEmptyCard && comparisons.length > 0 ? (
            // This is the empty card that appears after clicking "Compare Brands"
            <motion.div 
              className="mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ComparisonEmptyCard />
            </motion.div>
          ) : !isCompareMode ? (
            // Default "No results yet" card - only shown if not in compare mode
            <div className="mb-10">
              <NoResultsCard />
            </div>
          ) : null}

          {/* Brand Comparisons Section - Always shown when there are comparisons */}
          {comparisons.length > 0 && (
            <BrandComparisonsSection
              comparisons={comparisons}
              onRemove={removeComparison}
            />
          )}
        </div>
      </main>
    </div>
  );
}