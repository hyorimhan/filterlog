import { getUserProfile } from '@/service/auth';
import { useQuery } from '@tanstack/react-query';

//닉네임 저장
function useUserProfileQuery({ user_id }: { user_id: string }) {
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profileData', user_id],
    queryFn: () => getUserProfile(user_id),
    enabled: Boolean(user_id),
  });
  return {
    profileData,
    isLoading,
  };
}

export default useUserProfileQuery;
