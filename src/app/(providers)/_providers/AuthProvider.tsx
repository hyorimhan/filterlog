'use client';
import { getBlogProfile, userInfo } from '@/service/auth';

import useUserInfo from '@/zustand/useUserInfo';
import React, { PropsWithChildren, useEffect } from 'react';

function AuthProvider({ children }: PropsWithChildren) {
  const { saveUser, user, saveNickname } = useUserInfo();
  const email = user?.email;

  useEffect(() => {
    const loginInfo = async () => {
      try {
        const user = await userInfo();
        saveUser(user);
      } catch (error) {
        console.error('로그인 정보 불러오기 오류:', error);
      }
    };
    loginInfo();
  }, [email, saveUser]);

  useEffect(() => {
    const userNickname = async () => {
      try {
        if (!user?.id) {
          return;
        }
        const profileData = await getBlogProfile(user?.id);
        if (profileData) {
          saveNickname(profileData?.nickname);
        }
      } catch (error) {
        console.log('이메일 정보가 없습니다');
      }
    };
    userNickname();
  }, [user?.id, saveNickname]);

  return <div>{children}</div>;
}

export default AuthProvider;
