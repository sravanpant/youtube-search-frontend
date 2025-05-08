// frontend/src/app/page.tsx
"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import ResultsTable from "@/components/ResultsTable";
import { Video, SearchParams } from "@/types/types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api, APIError } from "@/lib/api";
import { DateFilterOption } from "@/types/enums";
import {
  AlertTriangle,
  BarChart3,
  LineChart,
  SearchCheck
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

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
  const [activeTab, setActiveTab] = useState("results");

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    setLastSearchParams(params);
    setActiveTab("results"); // Switch to results tab on search
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

  // Summary statistics for analytics tab
  const totalViews = videos.reduce(
    (sum, video) => sum + parseInt(video.viewCount || "0"),
    0
  );
  const totalLikes = videos.reduce(
    (sum, video) => sum + parseInt(video.likeCount || "0"),
    0
  );
  const avgEngagement =
    videos.length > 0 ? ((totalLikes / totalViews) * 100).toFixed(2) : "0";
  const videosWithLinks = videos.filter(
    (v) => v.brand_links && v.brand_links.length > 0
  ).length;

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
              {/* <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm py-1 px-3 rounded-full border border-border/50 shadow-sm text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Enterprise Edition</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 -mt-6">
          <Card className="shadow-md border-border/50 overflow-hidden">
            <CardContent className="p-6">
              <SearchForm onSearch={handleSearch} isLoading={loading} />
            </CardContent>
          </Card>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 mt-6">
            <Alert variant="destructive" className="border shadow-sm">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Results Section - Full width with appropriate padding */}
        <div className="px-4 sm:px-6 lg:px-8 mt-8 max-w-[1920px] mx-auto">
          {videos.length > 0 ? (
            <Tabs defaultValue="results" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-muted/60">
                  <TabsTrigger value="results" className="data-[state=active]:bg-background">
                    <SearchCheck className="h-4 w-4 mr-2" />
                    Search Results
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-background">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </TabsTrigger>
                </TabsList>
                <div className="text-sm font-medium text-muted-foreground flex items-center">
                  <LineChart className="h-4 w-4 mr-2 text-primary" />
                  {videos.length} videos found
                </div>
              </div>
              
              <TabsContent value="results" className="mt-0">
                <Card className="shadow-sm border-border/80">
                  <CardContent className="p-0">
                    <div className="w-full overflow-auto px-5">
                      <ResultsTable
                        videos={videos}
                        searchParams={lastSearchParams}
                        isLoading={loading}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <Card className="shadow-sm border-border/80">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                      Video Performance Analytics
                    </h3>
                    
                    <Separator className="mb-6" />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="bg-muted/30 rounded-lg p-4 border border-border/60">
                        <div className="text-sm text-muted-foreground">Total Videos</div>
                        <div className="text-2xl font-semibold mt-1">{videos.length}</div>
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-4 border border-border/60">
                        <div className="text-sm text-muted-foreground">Total Views</div>
                        <div className="text-2xl font-semibold mt-1">{totalViews.toLocaleString()}</div>
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-4 border border-border/60">
                        <div className="text-sm text-muted-foreground">Engagement Rate</div>
                        <div className="text-2xl font-semibold mt-1">{avgEngagement}%</div>
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-4 border border-border/60">
                        <div className="text-sm text-muted-foreground">Videos with Brand Links</div>
                        <div className="text-2xl font-semibold mt-1">{videosWithLinks} <span className="text-sm text-muted-foreground">({Math.round(videosWithLinks/videos.length*100)}%)</span></div>
                      </div>
                    </div>
                    
                    <div className="mt-8 text-sm text-muted-foreground">
                      <p>The analytics dashboard provides high-level insights based on your search results. Enterprise users have access to detailed performance metrics, trend analysis, and competitor benchmarking.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="shadow-sm border-border/80">
              <CardContent className="px-6 py-10 flex flex-col items-center justify-center text-center">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full mb-4">
                  <SearchCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">No Search Results Yet</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Enter a brand name and configure your search parameters above to find YouTube videos mentioning your brand.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
