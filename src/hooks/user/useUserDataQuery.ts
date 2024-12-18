import { userInfo } from '@/service/auth';
import { useQuery } from '@tanstack/react-query';

// 유저 정보 저장
export default function useUserDataQuery() {
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: userInfo,
  });
  return { userData };
}
