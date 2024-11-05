'use client';

import useBlogInfo from '@/zustand/useBlogInfo';
import React from 'react';

function BlogHeader() {
  const blogInfo = useBlogInfo((state) => state.blogInfo);
  return (
    <>
      <div className="h-[150px] w-[1280px] mx-auto flex  justify-center items-center border-b-0 border-t-0 bg-custom-green-300 border-2 border-y-custom-green-700">
        <span className="text-lg ">{blogInfo?.blog_name}</span>
      </div>
      <div className="h-12 text-sm border-2 font-medium border-y-custom-green-700 mb-1 flex justify-start pl-2 items-center">
        <span> {blogInfo?.description}</span>
      </div>
    </>
  );
}

export default BlogHeader;
