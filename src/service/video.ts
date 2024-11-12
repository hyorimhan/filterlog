import axios from 'axios';

interface VideoItem {
  snippet: {
    resourceId: {
      videoId: string;
    };
  };
}

export const youtubePlayLIst = async (): Promise<VideoItem[]> => {
  const { data } = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLvQ1saE9GneCe0JIWiPat0tZ-3aeXBsME&si=MwULP5lyV94wj_Cl&maxResults=50&key=${process.env.NEXT_PUBLIC_YOUTUBE_KEY}`
  );
  return data.items;
};
