'use client';
import PostList from './post/PostList';
import Emotion from './emotion/Emotion';
import TotalEmotion from './emotion/TotalEmotion';
import LeftSide from '@/components/common/LeftSide';
import User from './User';
import useBlogInfo from '@/zustand/useBlogInfo';
import { useQuery } from '@tanstack/react-query';
import { getBlogId } from '@/service/blog';
import { useEffect } from 'react';
import Loading from '../common/Loading';
import { blogParams } from '@/types/userBlog';
// import BlogHeader from '../common/layout/BlogHeader';

function Default({ params }: Readonly<blogParams>) {
  const blog_id = params.id;
  const { saveOwnerId, saveBlogInfo } = useBlogInfo();

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
      {/* <BlogHeader /> */}
      <div className="grid grid-cols-[1fr_5fr]">
        <div className="h-[300px] border-2 border-y-custom-green-700 border-r-custom-green-700">
          <User />
        </div>

        <div className=" grid grid-cols-2 h-[300px] gap-2 mx-1">
          <Emotion />
          <TotalEmotion />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_5fr] mt-1">
        <LeftSide />
        <div className="mx-1  ">
          <PostList />
        </div>
      </div>
    </>
  );
}

export default Default;
