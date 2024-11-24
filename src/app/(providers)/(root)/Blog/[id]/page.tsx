'use client';
import BlogHeader from '@/components/common/BlogHeader';
import Default from '@/components/blog/Default';
import { getBlogId } from '@/service/blog';
import { blogParams } from '@/types/userBlog';
import useBlogInfo from '@/zustand/useBlogInfo';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/common/Loading';

const BlogDetailPage = ({ params }: blogParams) => {
  const { saveOwnerId, saveBlogInfo } = useBlogInfo();

  const blog_id = params.id;

  const { data: blogData, isLoading } = useQuery({
    queryKey: ['blog', blog_id],
    queryFn: () => getBlogId(blog_id),
    enabled: !!blog_id,
  });

  useEffect(() => {
    if (blogData) {
      saveBlogInfo(blogData);
      saveOwnerId(blogData?.user_id ?? '');
    }
  }, [saveBlogInfo, blogData, saveOwnerId]);
  if (!blog_id) {
    return <div>잘못된 접근입니다</div>;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {blogData?.description && <BlogHeader />}
      {<Default />}
    </>
  );
};

export default BlogDetailPage;
