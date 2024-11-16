'use client';
import { allUsers } from '@/service/blog';
import { useQuery } from '@tanstack/react-query';
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
        <div key={user.user_id}>{user.nickname}</div>
      ))}
    </div>
  );
};

export default AddFriend;
