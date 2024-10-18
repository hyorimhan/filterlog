import { totalMyEmotion } from '@/service/blog';
import { totalEmotionType } from '@/types/userBlog';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

function TotalEmotion({ user_id }: { user_id: string }) {
  const { data: total, isLoading } = useQuery<totalEmotionType>({
    queryKey: ['total', user_id],
    queryFn: () => totalMyEmotion({ user_id }),
    enabled: !!user_id,
  });

  if (isLoading) {
    return '로딩중';
  }
  console.log(total?.emotionCounts);
  console.log(total?.totalCount);
  const emotions = ['sad', 'angry', 'soso', 'smile', 'happy'];
  return (
    <div>
      {emotions.map((emotion) => (
        <div key={emotion} className=" flex items-center ml-5">
          <Image
            src={`/emotion/${emotion}.svg`}
            alt="emotion"
            width={50}
            height={50}
            className="py-1"
          />
          <div className="ml-2"> : {total?.emotionCounts[emotion] || 0}</div>
        </div>
      ))}
    </div>
  );
}

export default TotalEmotion;
