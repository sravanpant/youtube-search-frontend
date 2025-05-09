// frontend/src/components/ResultsTable/MobileVideoCard.tsx
import { Video } from "@/types/types";
import { UserCircle } from "lucide-react";
import { formatVideoDuration } from "./utils";

interface MobileVideoCardProps {
  video: Video;
}

export const MobileVideoCard = ({ video }: MobileVideoCardProps) => {
  return (
    <div className="border border-border rounded-lg mb-4 overflow-hidden">
      <div className="p-4 bg-card">
        <a
          href={video.videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          {video.title}
        </a>

        <div className="flex items-center mt-2 text-muted-foreground text-sm">
          <UserCircle className="h-4 w-4 mr-1" />
          {video.channelTitle}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
          <div>
            <div className="text-muted-foreground">Views</div>
            <div className="font-medium">
              {parseInt(video.viewCount).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Likes</div>
            <div className="font-medium">
              {parseInt(video.likeCount).toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground">Length</div>
            <div className="font-medium">
              {formatVideoDuration(video.duration)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};