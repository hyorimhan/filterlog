'use client';
import { userInfo } from '@/service/auth';
import useUserInfo from '@/zustand/useUserInfo';
import React, { PropsWithChildren, useEffect } from 'react';

function AuthProvider({ children }: PropsWithChildren) {
  const saveUser = useUserInfo((state) => state.saveUser);
  const user = useUserInfo((state) => state.user);
  console.log(user);
  useEffect(() => {
    const loginInfo = async () => {
      const user = await userInfo();
      saveUser(user);
    };
    loginInfo();
  }, []);

  return <div>{children}</div>;
}

export default AuthProvider;
