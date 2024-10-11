'use client';
import BlogHeader from '@/components/blog/myBlog/BlogHeader';
import Default from '@/components/blog/myBlog/Default';
import { existingBlog } from '@/service/blog';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';

import React from 'react';

const BlogDetailPage = () => {
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
      {blog?.description && <BlogHeader description={blog.description} />}
      {blog?.id && <Default blog_id={blog.id} />}
    </>
  );
};

export default BlogDetailPage;
