'use client';
import { profile, userInfo } from '@/service/auth';
import useUserInfo from '@/zustand/useUserInfo';
import React, { PropsWithChildren, useEffect } from 'react';

function AuthProvider({ children }: PropsWithChildren) {
  const saveUser = useUserInfo((state) => state.saveUser);
  const user = useUserInfo((state) => state.user);
  const email = user?.email;
  const saveNickname = useUserInfo((state) => state.saveNickname);

  useEffect(() => {
    if (!email) {
      console.log('이메일 정보가 없습니다');
      return;
    }
    const loginInfo = async () => {
      const user = await userInfo();
      const profileData = await profile(email);
      saveUser(user);
      if (profileData) {
        saveNickname(profileData?.nickname);
      }
    };
    loginInfo();
  }, []);

  return <div>{children}</div>;
}

export default AuthProvider;
