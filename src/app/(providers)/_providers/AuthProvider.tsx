'use client';

import { useProfileQuery } from '@/hooks/user/useProfileQuery';
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
  });

  const { profileData } = useProfileQuery({ user_id: userData?.id ?? '' });

  useEffect(() => {
    if (userData) {
      saveUser(userData);
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
