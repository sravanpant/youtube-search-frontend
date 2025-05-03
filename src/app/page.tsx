// app/page.tsx
'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import ResultsTable from '@/components/ResultsTable';
import { TableSkeleton } from '@/components/TableSkeleton';
import { Video, SearchParams } from '@/types/types';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api, APIError } from '@/lib/api';

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.search(params);
      setVideos(data);
    } catch (error) {
      const message = error instanceof APIError 
        ? `Error: ${error.message}`
        : 'Failed to fetch videos. Please try again later.';
      setError(message);
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <SearchForm onSearch={handleSearch} isLoading={loading} />
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <TableSkeleton />
        ) : videos?.length > 0 ? (
          <ResultsTable videos={videos} />
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No results to display. Try searching for videos.
          </div>
        )}
      </div>
    </div>
  );
}