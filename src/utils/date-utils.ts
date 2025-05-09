// frontend/src/utils/date-utils.ts
/**
 * Formats a date for the YouTube API in RFC 3339 format
 * @param date The date to format
 * @returns A date string in the correct format for YouTube API
 */
export function formatDateForYouTubeAPI(date?: Date): string | undefined {
    if (!date) return undefined;
    
    // Format date to RFC 3339 format (YYYY-MM-DDThh:mm:ss.sssZ)
    // This is the format required by the YouTube API
    return date.toISOString();
  }