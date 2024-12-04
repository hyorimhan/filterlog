import {getUserProfile, userProfileImg} from '@/service/auth';
import {useQuery} from '@tanstack/react-query';

// type userProfileType = {
//   profileData: UserTableType | null | undefined
//   profileImg: blogType | null | undefined
//   isLoading: boolean;
// };

export const useProfileQuery = ({user_id}: {user_id: string}) => {
  const {data: profileData} = useQuery({
    queryKey: ['profileData', user_id],
    queryFn: () => getUserProfile(user_id),
    enabled: Boolean(user_id),
  });
  // 유저 테이블

  const {data: profileImg, isLoading} = useQuery({
    queryKey: ['profileImg', user_id],
    queryFn: () => {
      if (!user_id) return null;
      return userProfileImg(user_id);
    },
    enabled: !!user_id,
  });
  // 블로그 테이블
  return {
    profileData,
    profileImg,
    isLoading,
  };
};
