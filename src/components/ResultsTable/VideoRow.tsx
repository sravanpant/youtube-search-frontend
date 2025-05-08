// frontend/src/components/ResultsTable/VideoRow.tsx
import { ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { VideoTooltip } from "./VideoToolTip";
import { formatVideoDuration } from "./utils";
import { VideoProps } from "@/types/types";

export const VideoRow = ({ video }: VideoProps) => {
  return (
    <tr className="hover:bg-muted/50">
      <td className="px-4 py-3">
        <TooltipProvider>
          <Tooltip delayDuration={300}>
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
            <TooltipContent side="right" className="w-80 p-0 border shadow-lg">
              <VideoTooltip video={video} />
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
                      {video.brand_links.length} Link
                      {video.brand_links.length > 1 ? "s" : ""}
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
                      <li
                        key={index}
                        className="break-all hover:bg-muted/50 rounded px-1"
                      >
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-500 hover:underline text-sm dark:text-blue-400 dark:hover:text-blue-300"
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
  );
};
