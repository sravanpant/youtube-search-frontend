// components/ResultsTable.tsx
"use client";

import { useState } from "react";
import { Video } from "@/types/types";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formatVideoDuration = (duration: string) => {
  if (!duration) return "0:00";
  
  try {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "0:00";

    const hours = parseInt(match[1] || "0");
    const minutes = parseInt(match[2] || "0");
    const seconds = parseInt(match[3] || "0");

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds === 0) return "0:00";
    if (totalSeconds < 60) {
      return `0:${seconds.toString().padStart(2, "0")}`;
    } else if (totalSeconds < 3600) {
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    } else {
      const hrs = Math.floor(totalSeconds / 3600);
      const mins = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
  } catch (error) {
    console.error("Error parsing duration:", error);
    return "0:00";
  }
};

type SortField =
  | "title"
  | "channelTitle"
  | "viewCount"
  | "publishTime"
  | "finalScore"
  | "likeCount"
  | "subscriberCount"
  | "duration"
  | "brand_links";
type SortOrder = "asc" | "desc";

interface SortableHeaderProps {
  field: SortField;
  label: string;
  currentSort: SortField | null;
  currentOrder: SortOrder;
  onSort: (field: SortField) => void;
}

const SortableHeader = ({
  field,
  label,
  currentSort,
  currentOrder,
  onSort,
}: SortableHeaderProps) => {
  return (
    <th className="px-4 py-3">
      <Button
        variant="ghost"
        onClick={() => onSort(field)}
        className="hover:bg-slate-100 h-8 w-full flex items-center justify-start gap-1"
      >
        {label}
        {currentSort === field ? (
          currentOrder === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )
        ) : (
          <ArrowUpDown className="h-4 w-4 opacity-50" />
        )}
      </Button>
    </th>
  );
};

export default function ResultsTable({
  videos: initialVideos,
}: {
  videos: Video[];
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

  const sortedVideos = [...initialVideos].sort((a, b) => {
    if (!sortField) return 0;

    let comparison = 0;
    switch (sortField) {
      case "title":
      case "channelTitle":
        comparison = a[sortField].localeCompare(b[sortField]);
        break;
      case "viewCount":
        comparison = parseInt(a.viewCount) - parseInt(b.viewCount);
        break;
      case "likeCount":
        comparison = parseInt(a.likeCount) - parseInt(b.likeCount);
        break;
      case "subscriberCount":
        comparison = parseInt(a.subscriberCount) - parseInt(b.subscriberCount);
        break;
      case "duration":
        // Convert durations to seconds for comparison
        const getDurationInSeconds = (duration: string) => {
          const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
          if (!match) return 0;
          const hours = parseInt(match[1] || "0");
          const minutes = parseInt(match[2] || "0");
          const seconds = parseInt(match[3] || "0");
          return hours * 3600 + minutes * 60 + seconds;
        };
        const aDuration = getDurationInSeconds(a.duration);
        const bDuration = getDurationInSeconds(b.duration);
        comparison = aDuration - bDuration;
        break;
      case "publishTime":
        comparison =
          new Date(a.publishTime).getTime() - new Date(b.publishTime).getTime();
        break;
      default:
        return 0;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  }); 

  // Pagination logic
  const totalPages = Math.ceil(sortedVideos.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedVideos = sortedVideos.slice(startIndex, endIndex);

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Entries per page selector */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Show</span>
        <Select
          value={entriesPerPage.toString()}
          onValueChange={(value) => {
            setEntriesPerPage(Number(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 25, 50, 100].map((number) => (
              <SelectItem key={number} value={number.toString()}>
                {number}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">entries per page</span>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
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
            <tbody className="divide-y divide-border">
              {paginatedVideos.map((video) => (
                <tr key={video.videoId} className="hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={video.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1 max-w-[400px] truncate"
                          >
                            {video.title}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{video.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="px-4 py-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={video.channelLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            {video.channelTitle}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Visit channel: {video.channelTitle}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          {parseInt(video.viewCount).toLocaleString()}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{video.viewCount} views</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          {parseInt(video.likeCount).toLocaleString()}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{video.likeCount} likes</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          {parseInt(video.subscriberCount).toLocaleString()}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{video.subscriberCount} Subscribers</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          {formatVideoDuration(video.duration)}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Duration: {formatVideoDuration(video.duration)}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="cursor-help">
                          {new Date(video.publishTime).toLocaleDateString()}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{new Date(video.publishTime).toLocaleString()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                  <td className="px-4 py-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-help text-center">
                            {video.brand_links && video.brand_links.length > 0 ? (
                              <div className="flex flex-wrap gap-1 justify-center">
                                <span className="text-primary">
                                  {video.brand_links.length} Link{video.brand_links.length > 1 ? 's' : ''}
                                  <ExternalLink className="h-3 w-3 ml-1 inline" />
                                </span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">No links</span>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-[400px]">
                          {video.brand_links && video.brand_links.length > 0 ? (
                            <div>
                              <p className="font-semibold mb-2">Brand Links:</p>
                              <ul className="space-y-1">
                                {video.brand_links.map((link, index) => (
                                  <li key={index} className="break-all hover:bg-muted/50 rounded px-1">
                                    <a
                                      href={link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-400 hover:text-blue-300 hover:underline text-sm dark:text-blue-600 dark:hover:text-blue-700"
                                    >
                                      {link}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <p>No brand links found in video description</p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 py-3">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, sortedVideos.length)}{" "}
          of {sortedVideos.length} entries
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {getPageNumbers().map((pageNum) => (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
}