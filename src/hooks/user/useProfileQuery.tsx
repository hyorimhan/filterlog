import { userProfileImg } from '@/service/auth';
import { useQuery } from '@tanstack/react-query';

export const useProfileQuery = ({ user_id }: { user_id: string }) => {
  const { data: profileImg, isLoading } = useQuery({
    queryKey: ['profileImg', user_id],
    queryFn: () => {
      if (!user_id) return null;
      return userProfileImg(user_id);
    },
    enabled: !!user_id,
  });
  // 블로그 테이블
  return {
    profileImg,
    isLoading,
  };
};
