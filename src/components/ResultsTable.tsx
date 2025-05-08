// frontend/src/components/ResultsTable.tsx
"use client";

import { useState } from "react";
import { SearchParams, Video } from "@/types/types";
import { sortVideos } from "./ResultsTable/utils";
import { ExportMenu } from "./ResultsTable/ExportMenu";
import { EntriesPerPageSelector } from "./ResultsTable/EntriesPerPageSelector";
import { TablePagination } from "./ResultsTable/TablePagination";
import { SortableHeader } from "./ResultsTable/SortableHeader";
import { SkeletonRow } from "./ResultsTable/SkeletonRow";
import { VideoRow } from "./ResultsTable/VideoRow";
import { MobileVideoCard } from "./ResultsTable/MobileVideoCard";
import { SortField, SortOrder } from "@/types/types";

export default function ResultsTable({
  videos: initialVideos,
  searchParams,
  isLoading = false,
}: {
  videos: Video[];
  searchParams: SearchParams;
  isLoading?: boolean;
}) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedVideos = sortVideos(initialVideos, sortField, sortOrder);

  // Pagination logic
  const totalPages = Math.ceil(sortedVideos.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedVideos = sortedVideos.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      {/* Top controls section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mb-4">
        <EntriesPerPageSelector 
          entriesPerPage={entriesPerPage}
          onEntriesChange={(value) => {
            setEntriesPerPage(Number(value));
            setCurrentPage(1);
          }}
        />
        
        <ExportMenu sortedVideos={sortedVideos} searchParams={searchParams} />
      </div>

      {/* Mobile view for videos */}
      <div className="md:hidden">
        {paginatedVideos.map((video) => (
          <MobileVideoCard key={video.videoId} video={video} />
        ))}
      </div>

      {/* Table for desktop view */}
      <div className="rounded-lg border border-neutral-200 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-50 text-neutral-600 uppercase text-xs tracking-wider">
              <tr>
                <SortableHeader
                  field="title"
                  label="Title"
                  currentSort={sortField}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="channelTitle"
                  label="Channel"
                  currentSort={sortField}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="viewCount"
                  label="Views"
                  currentSort={sortField}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="likeCount"
                  label="Likes"
                  currentSort={sortField}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="subscriberCount"
                  label="Subscribers"
                  currentSort={sortField}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="duration"
                  label="Length"
                  currentSort={sortField}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="publishTime"
                  label="Published"
                  currentSort={sortField}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  field="brand_links"
                  label="Brand Links"
                  currentSort={sortField}
                  currentOrder={sortOrder}
                  onSort={handleSort}
                />
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {isLoading ? (
                // Skeleton rows during loading
                Array.from({ length: 10 }).map((_, index) => (
                  <SkeletonRow key={`skeleton-${index}`} />
                ))
              ) : initialVideos.length > 0 ? (
                // Show actual video data when loaded
                paginatedVideos.map((video) => (
                  <VideoRow key={video.videoId} video={video} />
                ))
              ) : (
                // Show a message when no results and not loading
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No results to display. Try searching for videos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={sortedVideos.length}
        onPageChange={setCurrentPage}
        isLoading={isLoading}
      />
    </div>
  );
}