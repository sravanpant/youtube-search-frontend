// types/index.ts
export interface Video {
  videoId: string;
  title: string;
  channelTitle: string;
  channelId: string;
  channelLink: string;
  publishTime: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  duration: string;
  videoLink: string;
  subscriberCount: string;
  brand_links: string[];
}

export interface SearchParams {
  brand_name: string;
  max_results: number;
  location?: string;
  min_views?: number;
  channel_name?: string;
  upload_date_after?: string;
  upload_date_before?: string;
}
