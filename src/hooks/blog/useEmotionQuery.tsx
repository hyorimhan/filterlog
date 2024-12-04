import {existingMyEmotion} from '@/service/emotion';
import {useQuery} from '@tanstack/react-query';

//블로그 계정주 감정 데이터
export const useEmotionQuery = ({
  owner_id,
  blog_id,
  date,
}: {
  owner_id: string;
  blog_id: string;
  date: string;
}) => {
  const {data: emotionData, isLoading} = useQuery({
    queryKey: ['emotionData', owner_id, blog_id, date],
    queryFn: () => existingMyEmotion({owner_id, blog_id, date}),
    enabled: !!owner_id && !!blog_id,
  });
  return {
    emotionData,
    isLoading,
  };
};
