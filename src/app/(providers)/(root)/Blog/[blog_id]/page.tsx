'use client';
import BlogHeader from '@/components/blog/myBlog/BlogHeader';
import Default from '@/components/blog/myBlog/Default';
import { getBlogId } from '@/service/blog';
import useUserInfo from '@/zustand/useUserInfo';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import React from 'react';

const BlogDetailPage = () => {
  const { blog_id } = useParams();
  const user = useUserInfo((state) => state.user);

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', blog_id],
    queryFn: () => getBlogId(blog_id as string),
    enabled: !!blog_id,
  });

  if (isLoading) {
    return '로딩중';
  }
  console.log(blog?.user_id);

  const isOwner = user?.id === blog?.user_id;
  return (
    <>
      {blog?.description && <BlogHeader description={blog.description} />}
      {blog?.id && blog.nickname && blog.user_id && (
        <Default
          blog_id={blog.id}
          isOwner={isOwner}
          ownerId={blog.user_id}
          owner={blog?.nickname}
        />
      )}
    </>
  );
};

export default BlogDetailPage;
