import Loading from '@/components/common/Loading';
import { totalMyEmotion } from '@/service/emotion';
import { totalEmotionType } from '@/types/userBlog';
import useBlogInfo from '@/zustand/useBlogInfo';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

function TotalEmotion() {
  const ownerId = useBlogInfo((state) => state.ownerId);

  const { data: total, isLoading } = useQuery<totalEmotionType>({
    queryKey: ['total', ownerId],
    queryFn: () => totalMyEmotion({ ownerId: ownerId! }),
    enabled: !!ownerId,
  });

  if (isLoading || !total?.emotionCounts) {
    return <Loading />;
  }

  const emotions = ['sad', 'angry', 'soso', 'smile', 'happy'];
  const maxWidth = 400;

  return (
    <div className="flex flex-col space-y-2 justify-center items-center">
      {emotions.map((emotion) => {
        const count = total?.emotionCounts[emotion] || 0;
        const barWidth = Math.min((count / maxWidth) * 400, 400);
        return (
          <div key={emotion} className="flex items-center group">
            <Image
              src={`/emotion/${emotion}.svg`}
              alt={emotion}
              width={50}
              height={50}
              className="mr-4"
            />
            {/* 막대 */}
            <div className="w-[400px] flex items-center bg-gray-200 rounded-full h-6">
              <div
                className="w-[400px] bg-custom-green-600 h-6 ml-[1.5px] rounded-full transition-all duration-500"
                style={{ width: `${barWidth}%` }}
              ></div>
            </div>
            <div className="ml-2 opacity-0 group-hover:opacity-100  duration-300">
              {count}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TotalEmotion;
