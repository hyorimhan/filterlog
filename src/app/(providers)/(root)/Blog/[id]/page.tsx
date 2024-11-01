'use client';
import BlogHeader from '@/components/blog/myBlog/BlogHeader';
import Default from '@/components/blog/myBlog/Default';
import { getBlogId } from '@/service/blog';
import { blogParams } from '@/types/userBlog';
import useBlogInfo from '@/zustand/useBlogInfo';
import { useEffect } from 'react';

const BlogDetailPage = ({ params }: blogParams) => {
  const { blogInfo, saveOwnerId, saveBlogInfo } = useBlogInfo();

  const blog_id = params.id;
  console.log(blog_id);

  useEffect(() => {
    const blog = async () => {
      const response = await getBlogId(blog_id);
      saveBlogInfo(response);
      saveOwnerId(response?.user_id ?? '');
    };
    blog();
  }, [saveBlogInfo, blog_id, saveOwnerId]);
  return (
    <>
      {blogInfo?.description && <BlogHeader />}
      {<Default />}
    </>
  );
};

export default BlogDetailPage;
