'use client';
import Create from '@/components/blog/Create';
import BlogHeader from '@/components/blog/myBlog/BlogHeader';
import Default from '@/components/blog/myBlog/Default';
import useBlogInfo from '@/zustand/useBlogInfo';

const BlogDetailPage = () => {
  const { blogInfo } = useBlogInfo();

  return (
    <>
      {blogInfo?.description && <BlogHeader />}
      {blogInfo ? <Default /> : <Create />}
    </>
  );
};

export default BlogDetailPage;
