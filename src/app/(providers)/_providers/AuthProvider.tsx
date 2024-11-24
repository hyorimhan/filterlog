'use client';
import { getBlogProfile, userInfo } from '@/service/auth';

import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import React, { PropsWithChildren, useEffect } from 'react';

function AuthProvider({ children }: PropsWithChildren) {
  const { saveUser, user, saveNickname, nickname } = useUserInfo();
  console.log(user);
  console.log(nickname);
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: userInfo,
    staleTime: 0,
    gcTime: 0,
  });

  const { data: profileData } = useQuery({
    queryKey: ['profileData', userData?.id],
    queryFn: () => getBlogProfile(userData?.id as string),
    staleTime: 0,
    gcTime: 0,
  });
  useEffect(() => {
    try {
      if (userData) {
        saveUser(userData);
      }
    } catch (error) {
      console.log('유저 정보가 없습니다');
    }
  }, [userData, saveUser]);

  useEffect(() => {
    try {
      if (profileData?.nickname) {
        saveNickname(profileData?.nickname);
      }
      if (userData?.user_metadata.display_name && !profileData) {
        saveNickname(userData.user_metadata.display_name);
      }
    } catch (error) {
      console.log('이메일 정보가 없습니다');
    }
  }, [saveNickname, profileData, userData]);

  return <div>{children}</div>;
}

export default AuthProvider;
