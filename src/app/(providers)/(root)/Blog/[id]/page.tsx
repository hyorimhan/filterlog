import { blogParams } from '@/types/userBlog';
import React from 'react';

const BlogDetailPage = ({ params }: blogParams) => {
  return <div>{params.id}</div>;
};

export default BlogDetailPage;
