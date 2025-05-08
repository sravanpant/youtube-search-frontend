// frontend/src/components/ResultsTable/VideoTooltip.tsx
import { VideoProps } from "@/types/types";
import Image from "next/image";
import { UserCircle } from "lucide-react";
import { formatVideoDuration } from "./utils";

export const VideoTooltip = ({ video }: VideoProps) => {
  return (
    <div className="flex flex-col gap-2 max-w-sm p-3">
      {/* Thumbnail with play button overlay */}
      <div className="relative rounded-md overflow-hidden">
        <Image
          src={`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`}
          alt={video.title}
          className="w-full object-cover"
          width={320}
          height={180}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-60 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              className="opacity-90"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
      </div>

      {/* Video title */}
      <h4 className="text-sm font-semibold line-clamp-2">{video.title}</h4>

      {/* Channel name */}
      <div className="flex items-center">
        <UserCircle className="h-4 w-4 mr-1 text-neutral-500" />
        <span className="text-sm text-neutral-600">{video.channelTitle}</span>
      </div>

      {/* Video stats */}
      <div className="flex flex-wrap gap-2 text-xs text-neutral-500">
        <div className="flex items-center gap-1">
          <span>{parseInt(video.viewCount).toLocaleString()} views</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1">
          <span>{parseInt(video.likeCount).toLocaleString()} likes</span>
        </div>
        <span>•</span>
        <div>
          <span>{formatVideoDuration(video.duration)}</span>
        </div>
      </div>

      {/* Publication date */}
      <div className="text-xs text-neutral-500">
        Published {new Date(video.publishTime).toLocaleDateString()}
      </div>
    </div>
  );
};
