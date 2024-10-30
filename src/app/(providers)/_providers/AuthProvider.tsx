'use client';
import { userInfo } from '@/service/auth';
import { getBlogId } from '@/service/blog';
import useBlogInfo from '@/zustand/useBlogInfo';
import useUserInfo from '@/zustand/useUserInfo';
import React, { PropsWithChildren, useEffect } from 'react';

function AuthProvider({ children }: PropsWithChildren) {
  const saveUser = useUserInfo((state) => state.saveUser);
  const user = useUserInfo((state) => state.user);
  const email = user?.email;
  const saveBlogInfo = useBlogInfo((state) => state.saveBlogInfo);

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
    const blog = async () => {
      const response = await getBlogId(user?.id ?? '');
      saveBlogInfo(response);
    };
    blog();
  }, [saveBlogInfo, user?.id]);

  // useEffect(() => {
  //   const userNickname = async () => {
  //     try {
  //       if (!email) {
  //         console.log('이메일 오류');
  //         return;
  //       }
  //       const profileData = await profile(email);
  //       if (profileData) {
  //         saveNickname(profileData?.nickname);
  //       }
  //     } catch (error) {
  //       console.log('이메일 정보가 없습니다');
  //     }
  //   };
  //   userNickname();
  // }, [email, saveNickname]);

  return <div>{children}</div>;
}

export default AuthProvider;
