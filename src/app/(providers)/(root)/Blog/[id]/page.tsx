'use client';
import BlogHeader from '@/components/blog/myBlog/BlogHeader';
import Default from '@/components/blog/myBlog/Default';
import { getBlogId } from '@/service/blog';
import useBlogInfo from '@/zustand/useBlogInfo';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const BlogDetailPage = () => {
  const { blogInfo, saveOwnerId, saveBlogInfo } = useBlogInfo();
  const params = useParams();
  const blog_id = params.id as string;
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
