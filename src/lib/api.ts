import { SearchParams, Video } from '@/types/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

export const api = {
  search: async (params: SearchParams): Promise<Video[]> => {
    const response = await fetch(`${API_BASE_URL}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      
      // Handle specific error cases
      if (response.status === 500) {
        const errorDetail = errorData?.detail || '';
        if (errorDetail.includes('quota') || errorDetail.includes('All API keys have been exhausted')) {
          throw new APIError(response.status, 'YouTube API quota limit reached. Please wait a moment and try again as we switch to another API key.');
        }
        if (errorDetail.includes('No YouTube API keys available')) {
          throw new APIError(response.status, 'All YouTube API keys are currently unavailable. Please try again later.');
        }
      }

      // Default error message
      throw new APIError(
        response.status, 
        errorData?.detail || `Failed to fetch videos. Status: ${response.status}`
      );
    }

    return response.json();
  }
};