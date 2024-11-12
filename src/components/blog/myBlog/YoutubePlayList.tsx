'use client';
import { youtubePlayLIst } from '@/service/video';
import { useQuery } from '@tanstack/react-query';
import Youtube from 'react-youtube';

interface VideoItem {
  snippet: {
    resourceId: {
      videoId: string;
    };
  };
}

function YoutubePlayList() {
  const { data: videoItems, isLoading } = useQuery<VideoItem[]>({
    queryKey: ['youtube'],
    queryFn: () => youtubePlayLIst(),
  });

  const opts = {
    height: '280',
    width: '100%',
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
      controls: 0,
      showinfo: 0,
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,

      playsinline: 1,
      origin: 'http://localhost:3000',
    },
  };

  if (isLoading) {
    return '로딩중';
  }

  const videoIds = videoItems?.map((item) => item.snippet.resourceId.videoId);
  if (!videoIds?.length) {
    return null;
  }

  const firstVideo = videoIds[0];
  const playList = videoIds.join(',');
  return (
    <div>
      {videoItems && (
        <Youtube
          videoId={firstVideo}
          opts={{
            ...opts,
            playerVars: {
              ...opts.playerVars,
              playlist: playList,
            },
          }}
        ></Youtube>
      )}
    </div>
  );
}

export default YoutubePlayList;
