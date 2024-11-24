'use client';
import { userProfileImg } from '@/service/auth';
// import useBlogInfo from '@/zustand/useBlogInfo';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import Loading from '../common/Loading';

function User() {
  // const { blogInfo } = useBlogInfo();
  const { nickname, user } = useUserInfo();
  const { data: profileImg, isLoading: profileLoading } = useQuery({
    queryKey: ['profileImg', user?.id],
    queryFn: () => {
      if (!user?.id) return null;
      return userProfileImg(user?.id);
    },
    enabled: !!user?.id,
    staleTime: 0,
  });

  if (profileLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full flex flex-col justify-center items-center">
      {profileImg ? (
        <Image
          src={profileImg}
          alt="bloggerInfo"
          width={100}
          height={100}
          className="w-[100px] h-[100px] border-2 rounded-full border-custom-green-700"
        />
      ) : (
        <Image
          src={'/profile/profile.svg'}
          alt="bloggerInfo"
          width={100}
          height={100}
          className=" border-2 rounded-full border-custom-green-700"
        />
      )}

      <div className="bg-yellow-200 p-3 w-full text-center m-2">
        {nickname}님의 블로그
      </div>
    </div>
  );
}

export default User;
