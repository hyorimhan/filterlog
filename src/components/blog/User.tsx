'use client';
import useBlogInfo from '@/zustand/useBlogInfo';
import Image from 'next/image';
import React from 'react';

function User() {
  const { blogInfo } = useBlogInfo();
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Image
        src={blogInfo?.profile_img!}
        alt="bloggerInfo"
        width={100}
        height={100}
        className="border-2 rounded-full border-custom-green-700"
      />
      <div className="bg-yellow-200 p-3 w-full text-center m-2">
        {blogInfo?.nickname}님의 블로그
      </div>
    </div>
  );
}

export default User;
