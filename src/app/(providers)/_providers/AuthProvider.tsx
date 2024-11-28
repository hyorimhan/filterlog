'use client';

import { UseProfileQuery } from '@/hooks/user/UseProfileQuery';
import { userInfo } from '@/service/auth';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, useEffect } from 'react';

function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  const { saveUser, saveNickname } = useUserInfo();
  const queryClient = useQueryClient();
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: userInfo,
    staleTime: 0, // 5분
  });
  // console.log(userData);
  // const { data: profileData } = useQuery({
  //   queryKey: ['profileData', userData?.id],
  //   queryFn: () => getUserProfile(userData?.id as string),
  //   enabled: Boolean(userData?.id),
  //   staleTime: 0, // 5분
  // });
  const { profileData } = UseProfileQuery({ user_id: userData?.id ?? '' });

  // 데이터가 변경될 때만 상태 업데이트
  useEffect(() => {
    if (userData) {
      saveUser(userData);
      // if (userData.user_metadata.display_name) {
      //   saveNickname(userData.user_metadata.display_name);
      // }
    }
  }, [userData, saveUser, saveNickname, queryClient]);

  useEffect(() => {
    if (profileData?.nickname) {
      saveNickname(profileData.nickname);
    }
  }, [profileData, saveNickname, queryClient]);

  return <>{children}</>;
}

export default AuthProvider;
