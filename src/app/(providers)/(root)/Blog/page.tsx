import React from 'react';
import { existingBlog } from '../../../../service/blog';
import { userInfo } from '@/service/auth';
import Create from '@/components/blog/Create';
import { redirect } from 'next/navigation';

const BlogPage = async () => {
  const user = await userInfo();
  console.log('User:', user);
  const existing = user ? await existingBlog(user) : null;
  console.log('Existing Blog:', existing);

  if (existing) {
    redirect(`/Blog/${existing.id}`);
  }
  return (
    <div>
      <Create />
    </div>
  );
};

export default BlogPage;
