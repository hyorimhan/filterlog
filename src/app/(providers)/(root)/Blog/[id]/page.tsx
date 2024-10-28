'use client';
import BlogHeader from '@/components/blog/myBlog/BlogHeader';
import Default from '@/components/blog/myBlog/Default';
import useBlogInfo from '@/zustand/useBlogInfo';

const BlogDetailPage = () => {
  const { blogInfo } = useBlogInfo();

  return (
    <>
      {blogInfo?.description && (
        <BlogHeader description={blogInfo?.description} />
      )}
      {blogInfo && <Default />}
    </>
  );
};

export default BlogDetailPage;
