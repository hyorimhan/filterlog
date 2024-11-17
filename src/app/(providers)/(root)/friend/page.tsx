'use client';
import { allUsers } from '@/service/blog';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

const AddFriend = () => {
  const { data: allUser, isLoading } = useQuery({
    queryKey: ['allUser'],
    queryFn: allUsers,
  });

  if (isLoading) {
    return '로딩중';
  }
  return (
    <div>
      {allUser?.map((user) => (
        <div
          key={user.user_id}
          className="flex items-center justify-center p-3  border-2 border-custom-green-400 mx-5 my-5"
        >
          <div className="rounded-full border-2 mr-5  border-custom-green-700">
            <Image
              src={`${user.profile_img} `}
              alt="userProfile"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col text-sm space-y-5">
            {' '}
            <span> 닉네임 : {user.nickname}</span>
            <span>블로그 제목 : {user.blog_name}</span>
            <span>블로그 소개 : {user.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddFriend;
