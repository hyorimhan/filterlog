'use client';

import useUserDataQuery from '@/hooks/user/useUserDataQuery';
import useUserProfileQuery from '@/hooks/user/useUserProfileQuery';
import useUserInfo from '@/zustand/useUserInfo';
import { PropsWithChildren, useEffect } from 'react';

function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  const { saveUser, saveNickname } = useUserInfo();

  const { userData } = useUserDataQuery();
  const { profileData } = useUserProfileQuery({ user_id: userData?.id ?? '' });

  useEffect(() => {
    if (userData) {
      saveUser(userData);
    }
  }, [userData, saveUser, saveNickname]);

  useEffect(() => {
    if (profileData?.nickname) {
      saveNickname(profileData.nickname);
    }
  }, [profileData, saveNickname]);

  return <>{children}</>;
}

export default AuthProvider;
