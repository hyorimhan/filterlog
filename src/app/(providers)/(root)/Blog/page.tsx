import React from 'react';
import { existingBlog } from '../../../../service/blog';
import { userInfo } from '@/service/auth';
import Create from '@/components/blog/Create';

const BlogPage = async () => {
  const user = await userInfo();
  console.log(user);
  const existing = user ? await existingBlog(user) : null;
  return <div>{!existing && <Create />}</div>;
};

export default BlogPage;
