// src/types/types.ts
import { DateFilterOption } from "@/types/enums";

export interface ThumbnailItem {
  url: string;
  width: number;
  height: number;
}

export interface VideoThumbnails {
  default?: ThumbnailItem;
  medium?: ThumbnailItem;
  high?: ThumbnailItem;
  standard?: ThumbnailItem;
  maxres?: ThumbnailItem;
}

export interface SearchParams {
  brand_name: string;
  max_results: number;
  min_views: number;
  date_filter?: DateFilterOption;
  custom_date_from?: Date;
  custom_date_to?: Date;
  country_code?: string;
}

export interface Video {
  videoId: string;
  title: string;
  channelTitle: string;
  channelId: string;
  publishTime: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  subscriberCount: string;
  duration: string;
  description: string;
  thumbnails: VideoThumbnails;
  videoLink: string;
  channelLink: string;
  relevancy_score: number;
  brand_links: string[];
  country?: string;
}

export type SortField =
  | "title"
  | "channelTitle"
  | "viewCount"
  | "publishTime"
  | "finalScore"
  | "likeCount"
  | "subscriberCount"
  | "duration"
  | "brand_links";

export type SortOrder = "asc" | "desc";

export interface SortableHeaderProps {
  field: SortField;
  label: string;
  currentSort: SortField | null;
  currentOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export interface VideoProps {
  video: Video;
}
