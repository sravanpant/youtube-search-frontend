// frontend/src/components/ResultsTable/utils.ts
import { Video } from "@/types/types";
import { SortField, SortOrder } from "@/types/types";

export const formatVideoDuration = (duration: string) => {
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
      return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
  } catch (error) {
    console.error("Error parsing duration:", error);
    return "0:00";
  }
};

export const getDurationInSeconds = (duration: string) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");
  return hours * 3600 + minutes * 60 + seconds;
};

export const sortVideos = (
  videos: Video[],
  sortField: SortField | null,
  sortOrder: SortOrder
) => {
  if (!sortField) return [...videos];

  return [...videos].sort((a, b) => {
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
        const aDuration = getDurationInSeconds(a.duration);
        const bDuration = getDurationInSeconds(b.duration);
        comparison = aDuration - bDuration;
        break;
      case "publishTime":
        comparison =
          new Date(a.publishTime).getTime() - new Date(b.publishTime).getTime();
        break;
      case "brand_links":
        const aLinkCount = a.brand_links?.length || 0;
        const bLinkCount = b.brand_links?.length || 0;
        comparison = aLinkCount - bLinkCount;
        break;
      default:
        return 0;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });
};