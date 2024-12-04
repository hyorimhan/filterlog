'use client';
import LeftSide from '@/components/common/LeftSide';
import useBlogInfo from '@/zustand/useBlogInfo';
import Emotion from './emotion/Emotion';
import TotalEmotion from './emotion/TotalEmotion';
import PostList from './post/PostList';
import User from './User';

import { useBlogInfoQuery } from '@/hooks/blog/useBlogQuery';
import { blogParams } from '@/types/userBlog';
import { useEffect } from 'react';
import Loading from '../common/Loading';

function Default({ params }: Readonly<blogParams>) {
  const blog_id = params.id;
  const { saveOwnerId, saveBlogInfo } = useBlogInfo();
  const { blogData, isLoading } = useBlogInfoQuery(blog_id);

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
