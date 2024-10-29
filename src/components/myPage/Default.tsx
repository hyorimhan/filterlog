import useBlogInfo from '@/zustand/useBlogInfo';
import useUserInfo from '@/zustand/useUserInfo';
import React from 'react';
import User from '../auth/User';
import BlogHeader from '../blog/myBlog/BlogHeader';
import Profile from './Profile';

function Default() {
  const { blogInfo, ownerId } = useBlogInfo();
  const user = useUserInfo((state) => state.user);
  const isOwner = blogInfo?.user_id === ownerId;
  return (
    <>
      <BlogHeader />
      <div className="grid grid-cols-[1fr_5fr]">
        <div className="h-[300px] border-2 border-y-custom-green-700 border-r-custom-green-700">
          {isOwner ? <User email={user?.email} /> : blogInfo?.nickname}
        </div>

        <div className="  h-[300px] gap-2 mx-1 border-2 border-custom-green-400">
          <Profile />
        </div>
      </div>

      <div className="grid grid-cols-[1fr_5fr] mt-1">
        <div className=" h-[300px]"></div>
        <div className="mx-1  "></div>
      </div>
    </>
  );
}

export default Default;
