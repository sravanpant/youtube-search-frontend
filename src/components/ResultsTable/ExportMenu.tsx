// frontend/src/components/ResultsTable/ExportMenu.tsx
import { SearchParams, Video } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, DownloadCloud, FileJson, FileSpreadsheet, Table } from "lucide-react";
import { formatVideoDuration } from "./utils";

interface ExportMenuProps {
  sortedVideos: Video[];
  searchParams: SearchParams;
}

export const ExportMenu = ({ sortedVideos, searchParams }: ExportMenuProps) => {
  const exportToJson = () => {
    // Combine videos with search parameters
    const exportData = {
      searchParameters: searchParams,
      results: sortedVideos,
      totalResults: sortedVideos.length,
      exportDate: new Date().toISOString(),
    };

    // Create and download file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;

    const exportFileName = `youtube-search-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileName);
    linkElement.click();
  };

  const exportToCsv = () => {
    // Define CSV headers
    const headers = [
      "Title",
      "Channel",
      "Views",
      "Likes",
      "Subscribers",
      "Duration",
      "Published Date",
      "Video Link",
      "Channel Link",
      "Brand Links",
    ];

    // Create CSV rows from videos
    const rows = sortedVideos.map((video) => [
      `"${video.title.replace(/"/g, '""')}"`, // Escape quotes in title
      `"${video.channelTitle.replace(/"/g, '""')}"`,
      video.viewCount,
      video.likeCount,
      video.subscriberCount,
      formatVideoDuration(video.duration),
      new Date(video.publishTime).toISOString().split("T")[0],
      video.videoLink,
      video.channelLink,
      `"${video.brand_links?.join("\n").replace(/"/g, '""') || ""}"`,
    ]);

    // Add search parameters as metadata at the top
    const metadataRows = [
      ["# YouTube Search Results"],
      [`# Search query: ${searchParams.brand_name}`],
      [`# Min views: ${searchParams.min_views}`],
      [`# Date filter: ${searchParams.date_filter}`],
      [`# Export date: ${new Date().toLocaleString()}`],
      ["# "],
      headers,
    ];

    // Combine metadata and data rows
    const allRows = [...metadataRows, ...rows];

    // Convert to CSV string
    const csvContent = allRows.map((row) => row.join(",")).join("\n");

    // Create and download file
    const dataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(
      csvContent
    )}`;
    const exportFileName = `youtube-search-${
      new Date().toISOString().split("T")[0]
    }.csv`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileName);
    linkElement.click();
  };

  const exportToExcel = () => {
    try {
      // Define column headers
      const headers = [
        "Title",
        "Channel",
        "Views",
        "Likes",
        "Subscribers",
        "Duration",
        "Published Date",
        "Video Link",
        "Channel Link",
        "Brand Links",
      ];

      // Create data rows
      const dataRows = sortedVideos.map((video) => [
        `"${video.title.replace(/"/g, '""')}"`,
        `"${video.channelTitle.replace(/"/g, '""')}"`,
        video.viewCount,
        video.likeCount,
        video.subscriberCount,
        formatVideoDuration(video.duration),
        new Date(video.publishTime).toISOString().split("T")[0],
        `"${video.videoLink}"`,
        `"${video.channelLink}"`,
        `"${video.brand_links?.join(", ").replace(/"/g, '""') || ""}"`,
      ]);

      // Prepare metadata with empty cells to match the number of columns
      const emptyFields = ",".repeat(headers.length - 1);
      const metadataRows = [
        [`YouTube Search Results${emptyFields}`],
        [`Search query: ${searchParams.brand_name}${emptyFields}`],
        [`Min views: ${searchParams.min_views}${emptyFields}`],
        [`Date filter: ${searchParams.date_filter}${emptyFields}`],
        [`Export date: ${new Date().toLocaleString()}${emptyFields}`],
        [emptyFields],
      ];

      // Combine all rows
      const allRows = [
        ...metadataRows,
        [headers.join(",")],
        ...dataRows.map((row) => row.join(",")),
      ];

      // Join rows into CSV content
      const csvContent = allRows.join("\n");

      // Create and download file with .xls extension
      const blob = new Blob([csvContent], { type: "application/vnd.ms-excel" });
      const url = URL.createObjectURL(blob);

      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `youtube-search-${
        new Date().toISOString().split("T")[0]
      }.xls`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert(
        "There was a problem exporting to Excel. Please check the console for details."
      );
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-1"
          >
            <DownloadCloud className="h-4 w-4" />
            Export
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="border border-border shadow-md"
        >
          <DropdownMenuItem
            onClick={exportToJson}
            className="cursor-pointer"
          >
            <FileJson className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            Export as JSON
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={exportToCsv}
            className="cursor-pointer"
          >
            <FileSpreadsheet className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
            Export as CSV
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={exportToExcel}
            className="cursor-pointer"
          >
            <Table className="h-4 w-4 mr-2 text-green-700 dark:text-green-500" />
            Export as Excel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
