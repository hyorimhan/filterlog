'use client';
import { existingBlog } from '@/service/blog';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useUserInfo from '@/zustand/useUserInfo';

function BlogHeader() {
  const user = useUserInfo((state) => state.user);
  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog'],
    queryFn: () => existingBlog(user),
  });

  if (isLoading) {
    return '로딩중';
  }
  return (
    <>
      <div className="h-12 text-sm border-2 font-medium border-y-custom-green-700 mb-1 flex justify-center items-center">
        <span> {blog?.description}</span>
      </div>
    </>
  );
}

export default BlogHeader;
